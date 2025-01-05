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
    const invoces = await this.find({
      where: {
        data: Between(newFirstDate, secondDate),
        creditCard: {
          id,
        },
      },
      order: {
        data: 'DESC',
      },
    });

    return invoces;
  }
}
