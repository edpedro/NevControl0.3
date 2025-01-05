import { compare, hash } from 'bcryptjs';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { OAuth2Client } from 'google-auth-library';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  googleToken: string;
}

interface IResponse {
  user: User;
  token: string;
}

interface IPayload {
  email: string;
  name: string;
  email_verified: boolean;
}

class CreateGoogleService {
  public async execute({ googleToken }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const client = new OAuth2Client(process.env.CLIENT_ID);

    if (!googleToken) {
      throw new AppError('Erro.. Tente novamente', 401);
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.CLIENT_ID,
    });

    const { name, email, email_verified } = ticket.getPayload() as IPayload;

    if (!email_verified) {
      throw new AppError('Erro.. Erro ao Logar', 401);
    }

    const user = await usersRepository.findByEmail(email);

    const password = email + process.env.APP_SECRET;

    if (!user) {
      const hashedPassword = await hash(password, 8);

      const user = usersRepository.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      const saveUser = await usersRepository.save(user);

      const token = sign({}, authConfig.jwt.secret as Secret, {
        subject: saveUser.id,
      });

      return {
        user,
        token,
      };
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Erro.. Email já existir', 401);
    }

    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateGoogleService;
