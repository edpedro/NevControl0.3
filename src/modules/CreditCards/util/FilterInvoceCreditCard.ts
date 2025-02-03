import { format, addDays, subMonths, setDate } from 'date-fns';

interface IParams {
  close: string; // Dia de fechamento do cartão
  win: string; // Dia de vencimento do cartão
  month?: string; // Mês de referência no formato "MM"
}

export function FilterInvoceCreditCard({ close, win, month }: IParams) {
  const today = new Date();
  const year = today.getFullYear();
  const month1 = month ? Number.parseInt(month, 10) - 1 : today.getMonth();
  const closeDay = Number.parseInt(close, 10);
  const winDay = Number.parseInt(win, 10);

  // Determinar o mês de referência da fatura
  const referenceDate = new Date(year, month1, 1);

  let startPeriod, endPeriod;

  if (closeDay < winDay) {
    // Cartão que fecha e vence no mesmo mês (ex: fecha dia 1, vence dia 9)
    startPeriod = setDate(referenceDate, closeDay + 1);
    endPeriod = setDate(addDays(referenceDate, 32), closeDay); // Garante que estamos no próximo mês
  } else {
    // Cartão que fecha em um mês e vence no próximo (ex: fecha dia 26, vence dia 1)
    startPeriod = setDate(subMonths(referenceDate, 1), closeDay + 1);
    endPeriod = setDate(referenceDate, closeDay);
  }

  // Formatar datas
  const newFirstDate = format(startPeriod, 'yyyy-MM-dd');
  const secondDate = format(endPeriod, 'yyyy-MM-dd');

  return { newFirstDate, secondDate };
}
