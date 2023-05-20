import { Inject, Injectable, Logger } from '@nestjs/common';
import { IBalanceRepository } from 'src/modules/shared/interfaces/ibalance.repository';

@Injectable()
export class FindByDateService {
  constructor(
    @Inject('IBalanceRepository')
    private readonly balanceRepository: IBalanceRepository,
  ) {}

  protected logger = new Logger(FindByDateService.name);

  async execute(date: string): Promise<CashFlow.Balance | null> {
    return this.balanceRepository.findByDate(date);
  }
}
