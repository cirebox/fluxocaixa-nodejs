import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';

@Injectable()
export class FindAllService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  protected logger = new Logger(FindAllService.name);

  async execute(): Promise<CashFlow.Transaction[]> {
    return this.transactionRepository.findAll('D');
  }
}
