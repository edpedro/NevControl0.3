import { Request, Response } from 'express';
import CreateGoogleService from '../services/CreateGoogleService';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }

  public async createGoogleLogin(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { googleToken } = request.body;

    const createGoogleLogin = new CreateGoogleService();

    const user = await createGoogleLogin.execute({
      googleToken,
    });

    return response.json(user);
  }
}
