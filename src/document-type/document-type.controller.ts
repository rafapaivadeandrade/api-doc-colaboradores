import { Controller, Post, Body } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import type { CreateDocumentTypeDto } from './dto/create-document-type.dto';

@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly service: DocumentTypeService) {}

  @Post()
  create(@Body() data: CreateDocumentTypeDto) {
    return this.service.create(data);
  }
}
