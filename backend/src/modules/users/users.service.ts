import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
import { TokenService } from '../token/token.service';
import { AuthUserResponse } from '../auth/response';
import { AppError } from 'src/common/constants/errors';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly tokenService: TokenService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(password, 10); //два параметра - пароль, который надо захэшировать и солт, модификатор с помощью которого хэш будет всегда разным
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({
        //findOne - находим что-то одно и обращаемся к базе данных, передавая набор опций, по которым мы можем производить поиск
        where: { email: email },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({
        where: { id },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password); //обратились к дататрансферобжект к полю "пароль" и сказали что он теперь равняется результату выполнения метода hashPassword и именно ею мы заменяем наш строковый пароль который нам пришел.
      await this.userRepository.create({
        firstName: dto.firstName,
        userName: dto.userName,
        email: dto.email,
        password: dto.password,
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }

  async publicUser(email: string): Promise<AuthUserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
        attributes: { exclude: ['password'] },
        include: {
          model: Watchlist,
          required: false,
        },
      });
      const token = await this.tokenService.generateJwtToken(user);
      return { user, token };
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(userId: number, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    try {
      await this.userRepository.update(dto, { where: { id: userId } });
      console.log(dto);
      console.log(userId);
      return dto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updatePassword(userId: number, dto: UpdatePasswordDTO): Promise<any> {
    try {
      const { password } = await this.findUserById(userId);
      console.log(password);
      const currentPassword = await bcrypt.compare(dto.oldPassword, password);
      console.log(currentPassword);
      if (!currentPassword) return new BadRequestException(AppError.WRONG_DATA);
      const newPassword = await this.hashPassword(dto.newPassword);
      const data = {
        password: newPassword,
      };
      return this.userRepository.update(data, { where: { id: userId } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteUser(email: string): Promise<boolean> {
    try {
      await this.userRepository.destroy({ where: { email } });
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }
}
