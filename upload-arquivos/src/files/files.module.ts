import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity'; // Verifique se o caminho está certo!

@Module({
  imports: [
    // Esse é o cara que estava faltando!
    TypeOrmModule.forFeature([FileEntity]) 
  ],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}