import { EntityRepository, Repository } from 'typeorm';
import CreditCard from '../entities/CreditCard';

@EntityRepository(CreditCard)
export class CreditCardsRepository extends Repository<CreditCard> {
  public async findByName(bank: string): Promise<CreditCard | undefined> {
    const creditCard = await this.findOne({
      where: {
        bank,
      },
    });

    return creditCard;
  }

  public async findById(id: string): Promise<CreditCard | undefined> {
    const creditCard = await this.findOne({
      where: {
        id,
      },
    });

    return creditCard;
  }
}
