import Transaction from '../typeorm/entities/Transaction';
import { parseISO, format, isWithinInterval, subDays } from 'date-fns';

interface IParams {
  month: string;
  trans: Transaction[];
}

export function FilterTransactions({ trans, month }: IParams) {
  if (!month) {
    // If no month specified, return all transactions sorted by date
    return trans.sort((a, b) => {
      return new Date(b.data).getTime() - new Date(a.data).getTime();
    });
  }

  const result = trans.filter(transaction => {
    const transactionDate = parseISO(transaction.data);

    if (!transaction.creditCard) {
      // For non-credit card transactions, just check the month
      return format(transactionDate, 'MM') === month;
    }

    // Get credit card closing date and due date
    const closeDay = parseInt(transaction.creditCard.close);
    const winDay = parseInt(transaction.creditCard.win);

    // Convert month string to number (1-12)
    const targetMonth = parseInt(month);

    // Calculate the year based on the transaction date
    const transYear = transactionDate.getFullYear();
    const transMonth = transactionDate.getMonth() + 1; // 1-12

    let startDate, endDate;

    if (closeDay > winDay) {
      // Case: Closes on 26th, due on 1st (like Santander)
      // January bill: Dec 27 - Jan 26
      if (transMonth === targetMonth) {
        // Check if transaction is in target month up to closing date
        startDate = new Date(transYear, targetMonth - 1, 1);
        endDate = new Date(transYear, targetMonth - 1, closeDay);
      } else if (
        transMonth === targetMonth - 1 ||
        (targetMonth === 1 && transMonth === 12)
      ) {
        // Check if transaction is in previous month after closing date
        startDate = new Date(transYear, transMonth - 1, closeDay + 1);
        endDate = new Date(transYear, transMonth - 1, 31);
      }
    } else {
      // Case: Closes on 1st, due on 9th (like Nubank)
      // January bill: Jan 2 - Feb 1
      if (transMonth === targetMonth) {
        // Check if transaction is in target month after closing date
        startDate = new Date(transYear, transMonth - 1, closeDay + 1);
        endDate = new Date(transYear, transMonth - 1, 31);
      } else if (
        transMonth === targetMonth + 1 ||
        (targetMonth === 12 && transMonth === 1)
      ) {
        // Check if transaction is in next month up to closing date
        startDate = new Date(transYear, transMonth - 1, 1);
        endDate = new Date(transYear, transMonth - 1, closeDay);
      }
    }

    return (
      startDate &&
      endDate &&
      isWithinInterval(transactionDate, { start: startDate, end: endDate })
    );
  });

  // Sort by date descending
  return result.sort((a, b) => {
    return new Date(b.data).getTime() - new Date(a.data).getTime();
  });
}
