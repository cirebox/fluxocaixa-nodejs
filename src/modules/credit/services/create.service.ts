import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';
import { CreateDebitDto } from './../dtos/create-credit-dto';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CreateService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  protected logger = new Logger(CreateService.name);

  async execute(data: CreateDebitDto): Promise<CashFlow.Transaction> {
    const payload: CashFlow.Transaction = {
      type: 'C',
      userId: data.userId,
      date: data.date,
      value: data.value,
    };
    return this.transactionRepository.create(payload);
  }
}
