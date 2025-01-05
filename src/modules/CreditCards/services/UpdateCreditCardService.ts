import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CreditCard from '../typeorm/entities/CreditCard';
import { CreditCardsRepository } from '../typeorm/repositories/CreditCardsRepository';

interface IRequest {
  id: string;
  name: string;
  limit: number;
  close: string;
  win: string;
  bank: string;
}

class UpdateCreditCardService {
  public async execute({
    id,
    name,
    limit,
    close,
    win,
    bank,
  }: IRequest): Promise<CreditCard> {
    const creditCardsRepository = getCustomRepository(CreditCardsRepository);

    const creditCard = await creditCardsRepository.findOne({ where: { id } });

    if (!creditCard) {
      throw new AppError('Transaction not found.');
    }

    creditCard.name = name;
    creditCard.limit = limit;
    creditCard.close = close;
    creditCard.win = win;
    creditCard.bank = bank;

    await creditCardsRepository.save(creditCard);

    return creditCard;
  }
}

export default UpdateCreditCardService;
