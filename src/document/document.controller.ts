import { Controller, Get } from '@nestjs/common';

@Controller('documents')
export class DocumentController {
  @Get()
  getAll() {
    return 'Listar documentos';
  }
}
