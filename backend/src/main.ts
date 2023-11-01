import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module'; //корневой модуль, где собираюются все кастомные модули
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //базовый класс NestFactory и его метод create, куда мы передаем наш рутовый модуль (AppModule)
  const configService = app.get(ConfigService); //получаем ссылку на файл
  const port = configService.get('port'); //получаем значение для порта из файла
  await app.listen(port); //обращаемся к нашему экземпляру приложения и с помощью метода listen задаем ему порт 3000
}
bootstrap(); //вызываем функцию
