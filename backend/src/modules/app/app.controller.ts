import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') //сюда мы передаем url!!!
  getHello(): string {
    return this.appService.getHello(); //this - обращаемся в контексте этого класса - ищем AppService именно в контексте этого класса
  }
}
