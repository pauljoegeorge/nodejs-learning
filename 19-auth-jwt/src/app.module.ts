import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(typeOrmConfig),  UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
