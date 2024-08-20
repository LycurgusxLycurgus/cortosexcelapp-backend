import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Get the port from the environment variable or default to 3000
  const port = process.env.PORT || 3000; 

  //  Update the CORS origin
  app.enableCors({
    origin: 'https://cortosexcelapp-frontend.vercel.app/', // Replace with your Vercel domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });

  await app.listen(port, '0.0.0.0'); // Explicitly listen on all interfaces (0.0.0.0)

  console.log(`Application is running on: ${await app.getUrl()}`); 
}
bootstrap();