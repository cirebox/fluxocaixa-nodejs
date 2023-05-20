export interface ITransactionRepository {
  create(data: Partial<CashFlow.Transaction>): Promise<CashFlow.Transaction>;
  findAll(type: 'D' | 'C'): Promise<CashFlow.Transaction[]>;
  findById(id: string): Promise<CashFlow.Transaction | null>;
  findByDate(
    date: string,
    type: 'D' | 'C',
  ): Promise<CashFlow.Transaction[] | null>;
}
