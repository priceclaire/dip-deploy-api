

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { Request, Response, NextFunction } from 'express';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { cors: true });
//   app.setGlobalPrefix('api');
//   await app.listen(3000);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const corsOptions: CorsOptions = {
  //   origin: 'https://a609d02dff06146d48da289f58aef09b-1914571526.eu-north-1.elb.amazonaws.com',
  //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // };

  const corsOptions: CorsOptions = {
    origin: 'https://a609d02dff06146d48da289f58aef09b-1914571526.eu-north-1.elb.amazonaws.com', // Replace with your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
    optionsSuccessStatus: 204, 
    preflightContinue: false,
  };

  app.enableCors(corsOptions);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', corsOptions.origin as string);
      res.header('Access-Control-Allow-Methods', Array.isArray(corsOptions.methods) ? corsOptions.methods.join(',') : corsOptions.methods);
      res.header('Access-Control-Allow-Headers', Array.isArray(corsOptions.allowedHeaders) ? corsOptions.allowedHeaders.join(',') : corsOptions.allowedHeaders);
      res.sendStatus(corsOptions.optionsSuccessStatus);
    } else {
      next();
    }
  });







  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
