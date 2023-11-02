import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])], //добавлять модели я буду с помощью sequelize модуля, с помощью него я буду работать с запросами к базе данных.
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
