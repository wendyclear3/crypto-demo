import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10); //два параметра - пароль, который надо захэшировать и солт, модификатор с помощью которого хэш будет всегда разным
  }

  async createUser(dto): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password); //обратились к дататрансферобжект к полю "пароль" и сказали что он теперь равняется результату выполнения метода hashPassword и именно ею мы заменяем наш строковый пароль который нам пришел.
    await this.userRepository.create(dto);
    return dto;
  }
}
