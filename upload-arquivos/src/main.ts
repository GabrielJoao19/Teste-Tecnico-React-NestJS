import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // 1. Importe isso
import { join } from 'path';

async function bootstrap() {
  // 2. Adicione o tipo <NestExpressApplication> aqui
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 3. Ativa o CORS (Importante para o React conseguir ler os arquivos depois)
  app.enableCors();

  // 4. Configura a pasta de arquivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Define que a URL deve começar com /uploads/
  });

  await app.listen(3000, '0.0.0.0');
  console.log(`🚀 Servidor rodando em: http://localhost:3000`);
}
bootstrap();
