import { TransactionsRepository } from './../typeorm/repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';
import Transaction from '../typeorm/entities/Transaction';
import { FilterTransactions } from '../util/FilterTransactions';

interface IRequest {
  id: string;
  month: string;
}

interface IResponse {
  transactions: Transaction[];
  balance: {
    accountBalance: number;
    negativeBalance: number;
    currentBalance: number;
  };
}

class ListTransactionService {
  public async execute({ id, month }: IRequest): Promise<IResponse> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const trans = await transactionsRepository.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        user: {
          id,
        },
      },
    });

    const transactions = FilterTransactions({ month, trans });

    const { accountBalance, negativeBalance } = transactions.reduce(
      (acc, curret) => {
        switch (curret.type) {
          case 'receita':
            if (curret.operation === 'conta') {
              acc.accountBalance += Number(curret.value);
            }
            break;
          case 'despesa':
            if (curret.operation === 'conta') {
              acc.negativeBalance += Number(curret.value);
            }
        }
        return acc;
      },
      {
        accountBalance: 0,
        negativeBalance: 0,
        currentBalance: 0,
      },
    );

    const currentBalance = accountBalance - negativeBalance;

    return {
      balance: {
        accountBalance,
        negativeBalance,
        currentBalance,
      },
      transactions,
    };
  }
}

export default ListTransactionService;
