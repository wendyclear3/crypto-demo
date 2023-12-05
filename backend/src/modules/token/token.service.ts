import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user) {
    const payload = { user };
    return this.jwtService.sign(payload, {
      // первый объект - сам пэйлоад юзера, второй - опции, в котором мы передадим секретный ключ, которым будет подписан токен (количество секунд, которые будет жить токен)
      secret: this.configService.get('secret'),
      expiresIn: this.configService.get('expire_jwt'),
    });
  }
}
