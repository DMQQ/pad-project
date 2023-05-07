import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:1212',
  });

  app.use(cookieParser('secret'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () =>
    console.log('[Nest] Server running on: http://localhost:3000/'),
  );
}
bootstrap();
