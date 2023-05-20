import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';

@Injectable()
export class FindByIdService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  protected logger = new Logger(FindByIdService.name);

  async execute(id: string): Promise<CashFlow.Transaction> {
    return this.transactionRepository.findById(id);
  }
}
