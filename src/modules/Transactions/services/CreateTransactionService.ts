import { TransactionsRepository } from './../typeorm/repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';
import Transaction from '../typeorm/entities/Transaction';
import CreditCard from '../../CreditCards/typeorm/entities/CreditCard';
import { v4 as uuidv4 } from 'uuid';

type IUser = {
  id: string;
};

interface IRequest {
  description: string;
  value: number;
  data: string;
  category: string;
  type: string;
  operation: string;
  creditCard?: CreditCard;
  user: IUser;
}

class CreateTransactionService {
  public async execute({
    description,
    value,
    data,
    category,
    type,
    operation,
    creditCard,
    user,
  }: IRequest): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const newID = uuidv4();

    const transaction = transactionsRepository.create({
      id: newID,
      description,
      value,
      data,
      category,
      type,
      operation,
      creditCard,
      user,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
