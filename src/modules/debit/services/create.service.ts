import { Inject, Injectable, Logger } from '@nestjs/common';
import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';
import { CreateCreditDto } from '../dtos/create-credit-dto';

@Injectable()
export class CreateService {
  constructor(
    @Inject('ITransactionRepository')
    private readonly transactionRepository: ITransactionRepository,
  ) {}

  protected logger = new Logger(CreateService.name);

  async execute(data: CreateCreditDto): Promise<CashFlow.Transaction> {
    const payload: CashFlow.Transaction = {
      type: 'D',
      userId: data.userId,
      date: data.date,
      value: data.value,
    };
    return this.transactionRepository.create(payload);
  }
}
