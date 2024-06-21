import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  // Rest of the code...
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  /**
   * Swagger
   */
  const options = new DocumentBuilder()
    .setTitle('NodeJS Booking RestServer')
    .setDescription('RestAPI Server for Booking Systems')
    .setVersion('1.0')
    .addTag('Booking')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
