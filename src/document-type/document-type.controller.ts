import { Controller, Post, Body } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';

@Controller('document-types')
export class DocumentTypeController {
  constructor(private readonly service: DocumentTypeService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }
}
