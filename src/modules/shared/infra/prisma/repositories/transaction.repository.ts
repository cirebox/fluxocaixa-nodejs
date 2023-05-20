import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { Prisma } from '@prisma/client';
import { ITransactionRepository } from 'src/modules/shared/interfaces/itransaction.repository';

@Injectable()
export class TransactionRepositoryPrisma implements ITransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: Partial<CashFlow.Transaction>,
  ): Promise<CashFlow.Transaction> {
    const payload: Prisma.TransactionCreateInput = {
      date: data.date,
      userId: data.userId,
      type: data.type,
      value: data.value,
      createAt: data.createAt ?? new Date(),
    };
    const result = await this.prisma.transaction.create({ data: payload });
    return result;
  }

  async findAll(type: 'D' | 'C'): Promise<CashFlow.Transaction[] | null> {
    return await this.prisma.transaction.findMany({ where: { type: type } });
  }

  async findById(id: string): Promise<CashFlow.Transaction | null> {
    return await this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  async findByDate(
    date: string,
    type: string,
  ): Promise<CashFlow.Transaction[] | null> {
    return await this.prisma.transaction.findMany({ where: { date, type } });
  }
}
