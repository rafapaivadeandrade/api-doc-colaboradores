import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTypeService {
  findAll() {
    return 'Serviço de listagem de tipos de documentos';
  }
}
