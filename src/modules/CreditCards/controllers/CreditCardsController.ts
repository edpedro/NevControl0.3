import { Request, Response } from 'express';
import CreateCreditCardService from '../services/CreateCreditCardService';
import DeleteCreditCardService from '../services/DeleteCreditCardService';
import InvoceCreditCardService from '../services/InvoceCreditCardService';
import ListCreditCardsService from '../services/ListCreditCardService';
import ShowCreditCardService from '../services/ShowCreditCardService';
import UpdateCreditCardService from '../services/UpdateCreditCardService';

export default class CreditCardsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { month } = request.body;

    const listCreditCards = new ListCreditCardsService();

    const creditCard = await listCreditCards.execute({ id, month });

    return response.json(creditCard);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { month } = request.body;

    const showCreditCard = new ShowCreditCardService();

    const creditCard = await showCreditCard.execute({ id, month });

    return response.json(creditCard);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, limit, close, win, bank } = request.body;
    const { user } = request;

    const createCreditCard = new CreateCreditCardService();

    const creditCard = await createCreditCard.execute({
      name,
      limit,
      close,
      win,
      bank,
      user,
    });

    return response.json(creditCard);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, limit, close, win, bank } = request.body;
    const { id } = request.params;

    const updateCreditCard = new UpdateCreditCardService();

    const creditCard = await updateCreditCard.execute({
      id,
      name,
      limit,
      close,
      win,
      bank,
    });

    return response.json(creditCard);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCreditCard = new DeleteCreditCardService();

    await deleteCreditCard.execute({ id });

    return response.json([]);
  }

  public async invoce(request: Request, response: Response): Promise<Response> {
    const { month } = request.body;
    const { id } = request.params;

    const invoceCreditCards = new InvoceCreditCardService();

    const invoce = await invoceCreditCards.execute({
      month,
      id,
    });

    return response.json(invoce);
  }
}
