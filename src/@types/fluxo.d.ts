declare namespace CashFlow {
  interface Transaction {
    id?: string;
    date: string;
    userId: string;
    type: string;
    value: number;
    createAt?: Date;
    updateAt?: Date;
  }

  interface Balance {
    date: string;
    credit: number;
    debit: number;
    balance: number;
  }
}
