import { TransactionsRepository } from './../typeorm/repositories/TransactionsRepository';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Transaction from '../typeorm/entities/Transaction';

interface IRequest {
  id: string;
}

class ShowTransactionService {
  public async execute({ id }: IRequest): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction not found.');
    }

    return transaction;
  }
}

export default ShowTransactionService;
