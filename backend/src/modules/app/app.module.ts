import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from '../../configurations';
import { User } from '../users/models/user.model';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configurations] }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        synchronize: true,
        autoLoadModels: true,
        models: [User],
      }),
    }),
    UserModule,
  ], //импорт модулей сюда //forRoot - глобально
  controllers: [AppController], //сюда нужно добавлять контроллеры которые относятся к данному модулю
  providers: [AppService], //передаем сущности, которые обрабатывают бизнес-логику в нашем проекте (сервисы, репозитории)
  //exports: [], если представить что это модуль авторизации, то через экспорт можно передавать логику генерации токена, чтобы впоследствии AppModule мог его получить и внутри себя реализовывать функционал генерации токена
})
export class AppModule {}
