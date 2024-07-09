import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'; // Import the fs module
import { AppModule } from './app.module';
import { CustomLoggerService } from './services/logger.service';
import path = require('node:path');

declare const module: any;

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: new CustomLoggerService(),
    },
  );

  app.enableCors();
  app.enableShutdownHooks();

  /**
   * Swagger
   */
  const swaggerOptions = new DocumentBuilder()
    .setTitle('NodeJS Booking RestServer')
    .setDescription('RestAPI Server for Booking Systems')
    .setVersion('1.0')
    .addTag('Booking')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port = 3000;
  await app.listen(port);
  const serverAdress = await app.getUrl();
  logger.log(`Application is running on: ${serverAdress}`);
}

bootstrap();
