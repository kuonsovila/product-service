import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import { NestExpressApplication } from '@nestjs/platform-express';
import { BaseModule } from './api/base.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Product service API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const apiDocument = SwaggerModule.createDocument(app, config, {
    include: [BaseModule],
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, apiDocument);
  app.enableCors();
  if (process.env.NODE_ENV === 'production') app.use(helmet());
  // app.set('trust proxy', 1);
  app.use(compression());

  //localhost:3000/api

  const port = parseInt(process.env.PORT) || 3000;
  await app.listen(port, () => {
    console.log('Listen on port: ' + port);
  });
}
bootstrap();
