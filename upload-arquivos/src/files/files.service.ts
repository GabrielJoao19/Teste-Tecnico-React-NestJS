import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity'; // Verifique se o caminho está correto

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
      order: { createdAt: 'DESC' }, // Lista os mais recentes primeiro
    });
  }
}