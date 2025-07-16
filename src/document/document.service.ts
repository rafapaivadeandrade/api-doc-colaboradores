import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentService {
  findAll() {
    return 'Serviço de listagem de documentos';
  }
}
