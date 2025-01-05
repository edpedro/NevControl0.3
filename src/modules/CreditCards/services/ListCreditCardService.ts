import { CreditCardsRepository } from './../typeorm/repositories/CreditCardsRepository';
import { getCustomRepository } from 'typeorm';
import CreditCard from '../typeorm/entities/CreditCard';

import { FilterInvoceCreditCard } from '../util/FilterInvoceCreditCard';
import { TransactionsRepository } from '../../Transactions/typeorm/repositories/TransactionsRepository';

interface IRequest {
  id: string;
  month: string;
}

class ListCreditCardsService {
  public async execute({ id, month }: IRequest): Promise<CreditCard[]> {
    const creditCardsRepository = getCustomRepository(CreditCardsRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const creditCardExists = await creditCardsRepository.find({
      where: {
        user: {
          id,
        },
      },
    });

    const creditsResult = Promise.all(
      creditCardExists.map(async creditCard => {
        const { newFirstDate, secondDate } = FilterInvoceCreditCard({
          month,
          close: creditCard.close,
          win: creditCard.win,
        });

        const invoces = await transactionsRepository.findInvoce({
          newFirstDate,
          secondDate,
          id: creditCard.id,
        });

        invoces.forEach(element => {
          if (creditCard.id === element.creditCard.id) {
            if (element.type === 'receita') {
              creditCard.cardBalance -= Number(element.value);
            } else {
              creditCard.cardBalance += Number(element.value);
            }
          }
        });
        return creditCard;
      }),
    );

    return creditsResult;
  }
}

export default ListCreditCardsService;
