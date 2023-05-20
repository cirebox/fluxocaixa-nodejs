import { Global, Module } from '@nestjs/common';
import { config } from 'dotenv';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { PrismaService } from './infra/prisma/services/prisma.service';
import { TransactionRepositoryPrisma } from './infra/prisma/repositories/transaction.repository';
import { BalanceRepositoryPrisma } from './infra/prisma/repositories/balance.repository';

config();

@Global()
@Module({
  providers: [
    NestResponseBuilder,
    PrismaService,
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepositoryPrisma,
    },
    {
      provide: 'IBalanceRepository',
      useClass: BalanceRepositoryPrisma,
    },
  ],
  exports: [
    NestResponseBuilder,
    PrismaService,
    {
      provide: 'ITransactionRepository',
      useClass: TransactionRepositoryPrisma,
    },
    {
      provide: 'IBalanceRepository',
      useClass: BalanceRepositoryPrisma,
    },
  ],
})
export class SharedModule {}
