import { NestFactory } from '@nestjs/core';
import { VersionModule } from './modules/root/root.module';

async function bootstrap() {
  const app = await NestFactory.create(VersionModule);
  await app.listen(3000);
}
bootstrap();
