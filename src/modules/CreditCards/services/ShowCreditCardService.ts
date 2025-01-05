import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CreditCard from '../typeorm/entities/CreditCard';
import { CreditCardsRepository } from '../typeorm/repositories/CreditCardsRepository';
import { FilterInvoceCreditCard } from '../util/FilterInvoceCreditCard';
import { TransactionsRepository } from '../../Transactions/typeorm/repositories/TransactionsRepository';

interface IRequest {
  id: string;
  month: string;
}

class ShowCreditCardService {
  public async execute({ id, month }: IRequest): Promise<CreditCard> {
    const creditCardsRepository = getCustomRepository(CreditCardsRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const creditCard = await creditCardsRepository.findOne(id);

    if (!creditCard) {
      throw new AppError('CreditCard not found.');
    }

    const { close, win } = creditCard;

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
  }
}

export default ShowCreditCardService;
