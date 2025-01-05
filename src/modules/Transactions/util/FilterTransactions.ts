import Transaction from '../typeorm/entities/Transaction';
import { parseISO, format } from 'date-fns';

interface IParams {
  month: string;
  trans: Transaction[];
}

export function FilterTransactions({ trans, month }: IParams) {
  const result = trans.filter(transaction => {
    const date = format(parseISO(transaction.data), 'MM');

    if (month) {
      return date === month;
    } else {
      return date;
    }
  });

  result.sort(function (a, b) {
    if (a.data < b.data) {
      return 1;
    }
    if (a.data > b.data) {
      return -1;
    }
    return 0;
  });

  return result;
}
