const transactions = [
  {
    id: '1',
    date: '2023-05-19',
    userId: '123',
    type: 'Compra',
    value: 100.0,
    createAt: new Date(),
    updateAt: new Date(),
  },
  {
    id: '2',
    date: '2023-05-18',
    userId: '456',
    type: 'Venda',
    value: 50.0,
    createAt: new Date(),
    updateAt: new Date(),
  },
];

export function lancarTransacao(
  transacao: CashFlow.Transaction,
): CashFlow.Transaction {
  const now = new Date();
  return {
    ...transacao,
    createAt: now,
    updateAt: now,
  };
}

export function findTransacao(): CashFlow.Transaction[] {
  return transactions;
}

export function findTransacaoByDate(date: string): CashFlow.Transaction[] {
  return transactions.filter((transaction) => transaction.date === date);
}

export function findTransacaoById(id: string): CashFlow.Transaction {
  return transactions.filter((transaction) => transaction.id === id)[0];
}
