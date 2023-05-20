import { Module } from '@nestjs/common';
import { DebitController } from './controllers/debit.controller';
import { CreateService } from './services/create.service';
import { FindAllService } from './services/find-all.service';
import { FindByIdService } from './services/find-by-id.service';
import { FindByDateService } from './services/find-by-date.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [SharedModule],
  controllers: [DebitController],
  providers: [
    CreateService,
    FindAllService,
    FindByIdService,
    FindByDateService,
  ],
})
export class DebitModule {}
