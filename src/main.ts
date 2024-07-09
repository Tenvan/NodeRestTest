import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs'; // Import the fs module
import * as spdy from 'spdy';
import type { AddressInfo } from 'net';
import { AppModule } from './app.module';
import { CustomLoggerService } from './services/logger.service';
import path = require('node:path');

declare const module: any;

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule, {
    logger: new CustomLoggerService(),
  });
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

  const serverOptions = {
    key: fs.readFileSync(path.join(__dirname, '../Cert/test.key')),
    cert: fs.readFileSync(path.join(__dirname, '../Cert/test.crt')),
    // Weitere Optionen können hier konfiguriert werden
    allowHTTP1: true, // Ermöglicht dem Server, HTTP/1.1-Fallback zu handhaben
  };

  // Erstellen Sie einen HTTP/2-Server und übergeben Sie die Express-Instanz von NestJS
  const server = spdy.createServer(
    serverOptions,
    app.getHttpAdapter().getInstance(),
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port = 3000; // Definieren Sie den Port, auf dem Ihr Server laufen soll

  await app.listen(port, '127.0.0.1');
  const serverAdress = await app.getUrl();
  logger.log(`Application is running on: ${serverAdress}`);

  server.listen(port + 1, '127.0.0.1', () => {
    const serverAdress = server.address() as AddressInfo;
    logger.log(
      `Application is running on: (${serverAdress.family}) ${serverAdress.address}:${serverAdress.port}`,
    );
  });
}

bootstrap();
