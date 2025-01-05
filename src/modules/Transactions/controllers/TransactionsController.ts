import { Request, Response } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ListTransactionService from '../services/ListTransactionService';
import ShowTransactionService from '../services/ShowTransactionService';
import UpdateTransactionService from '../services/UpdateTransactionService';

export default class TransactionsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { month } = request.body;

    const listTransactions = new ListTransactionService();

    const transactions = await listTransactions.execute({ id, month });

    return response.json(transactions);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransaction = new ShowTransactionService();

    const transaction = await showTransaction.execute({ id });

    return response.json(transaction);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, value, data, category, type, operation, creditCard } =
      request.body;
    const { user } = request;

    const createTransaction = new CreateTransactionService();

    const transaction = await createTransaction.execute({
      description,
      value,
      data,
      category,
      type,
      operation,
      creditCard,
      user,
    });

    return response.json(transaction);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { description, value, data, category, type, operation, creditCard } =
      request.body;
    const { id } = request.params;

    const updateTransaction = new UpdateTransactionService();

    const transaction = await updateTransaction.execute({
      id,
      description,
      value,
      data,
      category,
      type,
      operation,
      creditCard,
    });

    return response.json(transaction);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteTranscation = new DeleteTransactionService();

    await deleteTranscation.execute({ id });

    return response.json([]);
  }
}
