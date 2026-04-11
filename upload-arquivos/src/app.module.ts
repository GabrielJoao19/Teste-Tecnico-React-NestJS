import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './files/entities/file.entity'; // Verifique se o caminho está correto!
import { FilesModule } from './files/files.module'; // Verifique se o caminho está correto!
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres', 
      password: 'postgres', 
      database: 'teste_upload', 
      entities: [FileEntity], // Listamos a entidade aqui
      synchronize: true, 
    }),
    FilesModule, // Importamos o módulo de arquivos aqui
  ],
  controllers: [], // Pode deixar vazio por enquanto, vamos registrar o FilesController aqui depois
  providers: [],   // Pode deixar vazio por enquanto
})
export class AppModule {}
