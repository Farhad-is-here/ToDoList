import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.enableCors();

  //---- Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription("Todo List API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Swagger is available on: ${await app.getUrl()}/api`);
}
void bootstrap();
