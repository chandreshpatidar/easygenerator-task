import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { WinstonModule } from 'nest-winston';
import { createLogger } from 'winston';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const instance = createLogger({});
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance }),
  });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Easygenerator API')
    .setDescription('The Easygenerator API')
    .addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/swagger', app, document);

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  await app.listen(port);
}

bootstrap().then(() => {
  console.log(`Server started on port ${port}`);
  console.log(`http://localhost:${port}/api/swagger`);
});
