import { TransactionsRepository } from './../../Transactions/typeorm/repositories/TransactionsRepository';
import { CreditCardsRepository } from './../typeorm/repositories/CreditCardsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

import { FilterInvoceCreditCard } from '../util/FilterInvoceCreditCard';
import Transaction from '../../Transactions/typeorm/entities/Transaction';

interface IRequest {
  month: string;
  id: string;
}

class InvoceCreditCardService {
  public async execute({ month, id }: IRequest): Promise<Transaction[]> {
    const creditCardsRepository = getCustomRepository(CreditCardsRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const creditCardExists = await creditCardsRepository.findById(id);

    if (!creditCardExists) {
      throw new AppError('CreditCard does not exist.');
    }

    const { close, win } = creditCardExists;

    const { newFirstDate, secondDate } = FilterInvoceCreditCard({
      month,
      close,
      win,
    });

    const invoces = await transactionsRepository.findInvoce({
      newFirstDate,
      secondDate,
      id,
    });

    return invoces;
  }
}

export default InvoceCreditCardService;
