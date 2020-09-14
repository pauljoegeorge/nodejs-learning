import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JsLogger } from './js-logger/js-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  app.useLogger(new JsLogger());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
