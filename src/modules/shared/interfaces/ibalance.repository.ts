export interface IBalanceRepository {
  findByDate(date: string): Promise<CashFlow.Balance | null>;
}
