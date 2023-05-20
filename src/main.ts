import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { createDocument } from './swagger/swagger.create-document';
import { SwaggerModule } from '@nestjs/swagger';
import { customOptions } from './swagger/swagger.custom-options';
import { AllowListCorsConfig } from './config/cors.-allowlist.config';
import { json, urlencoded } from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  SwaggerModule.setup('docs/v1', app, createDocument(app), customOptions);

  process.env.NODE_ENV !== 'dev'
    ? app.enableCors({
        origin: AllowListCorsConfig,
      })
    : app.enableCors();

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.use(helmet());
  app.use(compression());
  app.use(cookieParser());
  app.disable('x-powered-by');

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
      skipMissingProperties: true,
    }),
  );

  await app.listen(process.env.PORT || 3000);
  logger.verbose(await app.getUrl());
}
bootstrap();
