import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User, Watchlist]), TokenModule], //добавлять модели я буду с помощью sequelize модуля, с помощью него я буду работать с запросами к базе данных.
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
