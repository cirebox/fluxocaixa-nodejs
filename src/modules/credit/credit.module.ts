import { Module } from '@nestjs/common';
import { CreditController } from './controllers/credit.controller';
import { FindByDateService } from './services/find-by-date.service';
import { FindByIdService } from './services/find-by-id.service';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/find-all.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [CreditController],
  providers: [
    FindByDateService,
    FindByIdService,
    CreateService,
    FindAllService,
  ],
})
export class CreditModule {}
