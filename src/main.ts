import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ValidationPipe from './common/pipes/validation.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();