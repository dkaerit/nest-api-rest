import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RootModule } from './modules/root/root.module';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest js api rest full')
    .setDescription('Revisión de comportamiento de las rutas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  const availableRoutes = app.getHttpServer()._events.request._router.stack
  .reduce((acc, layer) => layer.route && !layer.route.path.startsWith('/api')? 
  { ...acc, [layer.route.path]: layer.route.stack[0].method } : acc, {});
}
bootstrap();
