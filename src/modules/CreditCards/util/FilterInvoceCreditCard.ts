import { format, addDays } from 'date-fns';

interface IParams {
  close: string; // Dia de fechamento do cartão
  win: string; // Dia de vencimento do cartão
  month?: string; // Mês de referência no formato "MM"
}

export function FilterInvoceCreditCard({ close, win, month }: IParams) {
  const today = new Date(); // Data atual
  const year = today.getFullYear(); // Ano atual
  const month1 = month ? Number(month) - 1 : today.getMonth(); // Mês de referência (0-11)
  const closeDay = Number(close);
  const winDay = Number(win);

  // Ajustar ano para o mês de referência
  const referenceDateInstance = new Date(year, month1, 1);
  const isAfterClosing =
    today.getDate() > closeDay || today.getMonth() > month1;

  const closingDate = new Date(
    referenceDateInstance.getFullYear(),
    referenceDateInstance.getMonth() - (isAfterClosing ? 0 : 1),
    closeDay,
  );

  // Início do período: dia seguinte ao fechamento anterior
  const startPeriod = addDays(closingDate, 1);

  // Fim do período: dia do próximo fechamento
  const endPeriod = new Date(
    closingDate.getFullYear(),
    closingDate.getMonth() + 1,
    closeDay,
  );

  // Formatar datas
  const newFirstDate = format(startPeriod, 'yyyy-MM-dd');
  const secondDate = format(endPeriod, 'yyyy-MM-dd');

  return { newFirstDate, secondDate };
}
