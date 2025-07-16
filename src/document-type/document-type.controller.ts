import { Controller, Get } from '@nestjs/common';

@Controller('document-types')
export class DocumentTypeController {
  @Get()
  getAll() {
    return 'Listar tipos de documento';
  }
}
