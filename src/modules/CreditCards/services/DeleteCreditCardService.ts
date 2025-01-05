import { CreditCardsRepository } from './../typeorm/repositories/CreditCardsRepository';
import AppError from '../../../shared/errors/AppError';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class DeleteCreditCardService {
  public async execute({ id }: IRequest): Promise<void> {
    const creditCardsRepository = getCustomRepository(CreditCardsRepository);

    const creditCard = await creditCardsRepository.findOne({ where: { id } });

    if (!creditCard) {
      throw new AppError('CreditCard not found.');
    }

    await creditCardsRepository.remove(creditCard);
  }
}

export default DeleteCreditCardService;
