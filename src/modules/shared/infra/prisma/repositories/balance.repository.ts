import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { IBalanceRepository } from 'src/modules/shared/interfaces/ibalance.repository';

@Injectable()
export class BalanceRepositoryPrisma implements IBalanceRepository {
  constructor(private prisma: PrismaService) {}

  async findByDate(date: string): Promise<CashFlow.Balance | null> {
    const transctions = await this.prisma.transaction.findMany({
      where: { date },
    });

    const credit = await transctions.reduce(
      (partialSum, c) =>
        c.type === 'C' ? partialSum + c.value : partialSum + 0,
      0,
    );

    const debit = await transctions.reduce(
      (partialSum, c) =>
        c.type === 'D' ? partialSum + c.value : partialSum + 0,
      0,
    );

    return {
      date,
      credit,
      debit,
      balance: credit - debit,
    };
  }
}
