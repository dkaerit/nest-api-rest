import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RootModule } from './modules/root/root.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(RootModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest js api rest full')
    .setDescription('Revisión de comportamiento de las rutas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // temp - Configurar las opciones de CORS con un comodín
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  await app.listen(3000);

  const availableRoutes = app.getHttpServer()._events.request._router.stack
  .reduce((acc, layer) => layer.route && !layer.route.path.startsWith('/api')? 
  { ...acc, [layer.route.path]: layer.route.stack[0].method } : acc, {});
}
bootstrap();
