import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Garanta que a pasta 'uploads' existe na raiz!
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      // Validação simples de tipo (Requisito do teste!)
      if (file.mimetype.match(/\/(jpg|jpeg|png|pdf)$/)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('Apenas arquivos de imagem ou PDF são permitidos!'), false);
      }
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado!');
    }
    
    const fileUrl = `http://3.22.172.99:3000/uploads/${file.filename}`;
    // Aqui enviamos os dados para o Service salvar no banco
    return this.filesService.create({
      name: file.originalname,
      url: fileUrl,
      type: file.mimetype,
      size: file.size,
    });
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Delete(':id') 
  async remove(@Param('id') id: string) {
    return await this.filesService.remove(id); 
  }
}
