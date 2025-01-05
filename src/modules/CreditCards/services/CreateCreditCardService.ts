import { CreditCardsRepository } from './../typeorm/repositories/CreditCardsRepository';
import { getCustomRepository } from 'typeorm';
import CreditCard from '../typeorm/entities/CreditCard';
import AppError from '../../../shared/errors/AppError';
import { v4 as uuidv4 } from 'uuid';

type IUser = {
  id: string;
};

interface IRequest {
  name: string;
  limit: number;
  close: string;
  win: string;
  bank: string;
  user: IUser;
}

class CreateCreditCardService {
  public async execute({
    name,
    limit,
    close,
    win,
    bank,
    user,
  }: IRequest): Promise<CreditCard> {
    const creditCardRepository = getCustomRepository(CreditCardsRepository);

    const creditCardExists = await creditCardRepository.findOne({
      where: { bank, user: { id: user.id } },
      relations: ['user'],
    });

    if (creditCardExists) {
      throw new AppError('Bank already used.');
    }
    const newID = uuidv4();

    const creditCard = creditCardRepository.create({
      id: newID,
      name,
      limit,
      close,
      win,
      bank,
      user,
      cardBalance: 0,
    });

    await creditCardRepository.save(creditCard);

    return creditCard;
  }
}

export default CreateCreditCardService;
