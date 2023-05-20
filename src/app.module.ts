import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_GUARD, APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ExceptionFilterHttp } from './core/filters/exception-filter-http.filter';
import { ResponseTransformInterceptor } from './core/interceptors/response-transform.interceptor';
import { DebitModule } from './modules/debit/debit.module';
import { CreditModule } from './modules/credit/credit.module';
import { SharedModule } from './modules/shared/shared.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 300,
      limit: 500000,
    }),
    DebitModule,
    CreditModule,
    SharedModule,
    BalanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilterHttp,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
  ],
})
export class AppModule {}
