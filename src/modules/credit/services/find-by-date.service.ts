import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';

@Injectable()
export class FindByDateService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  protected logger = new Logger(FindByDateService.name);

  async execute(date: string): Promise<CashFlow.Transaction[]> {
    return this.transactionRepository.findByDate(date, 'C');
  }
}
