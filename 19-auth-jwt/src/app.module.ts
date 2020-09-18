import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './address/address.module';
import * as typeOrmConfig from './config/typeorm.config';
import { LoggerModule } from './js-logger/js-logger.module';
import { LoggerMiddleware } from './js-logger/js-logger.middleware';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(typeOrmConfig), UsersModule, AddressModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoggerMiddleware).forRoutes(AppController);
  }
}
