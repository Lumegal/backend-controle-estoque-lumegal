import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // transforma os dados de entrada para o tipo correto
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // retorna erro se tiver campos que não estão no DTO
    }),
  );
  app.enableCors();

  const PORT = 3000
  
  await app.listen(PORT, '0.0.0.0');
  const url = await app.getUrl();
  console.log(`Controle de Estoque rodando em: ${url}`);
}

bootstrap();
