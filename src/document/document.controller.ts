import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly service: DocumentService) {}

  @Post('send')
  sendDocument(@Body() body: any) {
    return this.service.sendDocument(body);
  }

  @Post('link')
  linkDocuments(@Body() body: any) {
    return this.service.linkDocuments(body);
  }

  @Post('unlink')
  unlinkDocuments(@Body() body: any) {
    return this.service.unlinkDocuments(body);
  }

  @Get('pending')
  getAllPending(
    @Query('employeeId') employeeId?: string,
    @Query('documentTypeId') documentTypeId?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.service.getPendingDocuments(
      employeeId,
      documentTypeId,
      parseInt(page),
      parseInt(limit),
    );
  }
}
