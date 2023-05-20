import { Module } from '@nestjs/common';
import { BalanceController } from './controllers/balance.controller';
import { FindByDateService } from './service/find-by-date.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [BalanceController],
  providers: [FindByDateService],
})
export class BalanceModule {}
