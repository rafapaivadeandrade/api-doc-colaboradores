import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentTypeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.documentType.create({ data });
  }
}
