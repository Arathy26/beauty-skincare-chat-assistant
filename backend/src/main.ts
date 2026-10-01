import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Lets our React frontend (running on a different port) call this API
  app.enableCors();

  // Turns on the DTO validation decorators (@IsString, @IsNotEmpty, etc.)
  // whitelist: strips any fields not declared in the DTO
  // forbidNonWhitelisted: rejects the request (400) if extra fields are sent
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  // Swagger setup (Section 10 of the requirements doc) — builds a live,
  // browsable API page at /api where every endpoint can be tested directly,
  // without needing React or curl.
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Beauty & Skincare Chat Assistant API')
    .setDescription(
      'Backend API for the domain-specific skincare chat assistant. ' +
        'POST /chat accepts a user message and returns a domain-scoped ' +
        'assistant reply (skin type, ingredients, routine, concern care, ' +
        'or product guidance) — or a medical/off-topic redirect.',
    )
    .setVersion('1.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();