import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: Partial<FileEntity>) {
    const newFile = this.fileRepository.create(data);
    return await this.fileRepository.save(newFile);
  }

  async findAll() {
    return await this.fileRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: any) { // Alterado para any para evitar erro de tipagem no findOneBy
    // 1. Busca o arquivo
    const file = await this.fileRepository.findOneBy({ id });

    if (!file) {
      throw new NotFoundException(`Arquivo com ID ${id} não encontrado`);
    }

    try {
      // 2. Extrai o nome e garante ao TS que é uma string usando "as string"
      const fileName = file.url.split('/').pop() as string;
      
      // 3. Define o caminho da pasta de uploads
      const filePath = path.resolve(__dirname, '..', '..', 'uploads', fileName);

      // 4. Deleta o arquivo físico do disco
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // 5. Deleta o registro do banco de dados
      return await this.fileRepository.remove(file);
      
    } catch (error) {
      console.error("Erro ao remover arquivo:", error);
      throw new Error("Não foi possível excluir o arquivo físico ou o registro.");
    }
  }
}