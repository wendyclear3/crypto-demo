import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module'; //корневой модуль, где собираюются все кастомные модули
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:3000'],
    },
  }); //базовый класс NestFactory и его метод create, куда мы передаем наш рутовый модуль (AppModule)
  const configService = app.get(ConfigService); //получаем ссылку на файл
  const port = configService.get('port'); //получаем значение для порта из файла
  app.useGlobalPipes(new ValidationPipe()); //создаем с помощью импортированного класса пайп, с помощью которого мы будем проверять данные

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('This is API for my awesome project')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config); //сюда в качестве аргумента передаем экземпляр нашего приложения (app) и конфигурацию (config)
  SwaggerModule.setup('api', app, document); //три аргумента: префикс, который будет использоваться для входа на страничку нашей документации, экзмепляр приложения, экзмепляр полного документа который только что создали
  await app.listen(port); //обращаемся к нашему экземпляру приложения и с помощью метода listen задаем ему порт 3000
}
bootstrap(); //вызываем функцию
