import { TransactionsRepository } from './../typeorm/repositories/TransactionsRepository';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Transaction from '../typeorm/entities/Transaction';
import CreditCard from '../../CreditCards/typeorm/entities/CreditCard';

interface IRequest {
  id: string;
  description: string;
  value: number;
  data: string;
  category: string;
  type: string;
  operation: string;
  creditCard: CreditCard;
}

class UpdateTransactionService {
  public async execute({
    id,
    description,
    value,
    data,
    category,
    type,
    operation,
    creditCard,
  }: IRequest): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError('Transaction not found.');
    }
    transaction.description = description;
    transaction.value = value;
    transaction.data = data;
    transaction.category = category;
    transaction.type = type;
    transaction.operation = operation;
    transaction.creditCard = creditCard;

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default UpdateTransactionService;
