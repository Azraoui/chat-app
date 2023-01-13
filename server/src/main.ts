import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '127.0.0.1:300',
    credentials: true,
    methods: ['GET', 'POST', 'PUT']
  })
  await app.listen(5000);
}

bootstrap();
