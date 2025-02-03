import { Between, EntityRepository, Repository } from 'typeorm';
import Transaction from '../entities/Transaction';

interface IRequest {
  newFirstDate: string;
  secondDate: string;
  id: string;
}

@EntityRepository(Transaction)
export class TransactionsRepository extends Repository<Transaction> {
  public async findByCategory(
    category: string,
  ): Promise<Transaction | undefined> {
    const transaction = this.findOne({
      where: {
        category,
      },
    });

    return transaction;
  }
  public async findInvoce({
    newFirstDate,
    secondDate,
    id,
  }: IRequest): Promise<Transaction[]> {
    const whereCondition: any = {
      creditCard: { id },
    };

    if (newFirstDate && secondDate) {
      whereCondition.data = Between(newFirstDate, secondDate);
    }

    const invoces = await this.find({
      where: whereCondition,
      order: { data: 'DESC' },
    });

    return invoces;
  }
}
