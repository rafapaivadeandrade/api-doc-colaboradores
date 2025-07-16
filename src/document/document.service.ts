import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentStatus } from '@prisma/client';

@Injectable()
export class DocumentService {
  constructor(private readonly prisma: PrismaService) {}

  async sendDocument({
    employeeId,
    documentTypeId,
  }: {
    employeeId: string;
    documentTypeId: string;
  }) {
    return this.prisma.document.updateMany({
      where: {
        employeeId,
        documentTypeId,
        status: DocumentStatus.PENDING,
      },
      data: { status: DocumentStatus.SENT },
    });
  }

  async linkDocuments({
    employeeId,
    documentTypeIds,
  }: {
    employeeId: string;
    documentTypeIds: string[];
  }) {
    const createMany = documentTypeIds.map((documentTypeId) => ({
      employeeId,
      documentTypeId,
      name: `Documento de ${documentTypeId}`,
      status: DocumentStatus.PENDING,
    }));

    return this.prisma.document.createMany({
      data: createMany,
      skipDuplicates: true,
    });
  }

  async unlinkDocuments({
    employeeId,
    documentTypeIds,
  }: {
    employeeId: string;
    documentTypeIds: string[];
  }) {
    return this.prisma.document.deleteMany({
      where: {
        employeeId,
        documentTypeId: { in: documentTypeIds },
      },
    });
  }

  async getPendingDocuments(
    employeeId?: string,
    documentTypeId?: string,
    page = 1,
    limit = 10,
  ) {
    const skip = (page - 1) * limit;

    const where = {
      status: DocumentStatus.PENDING,
      ...(employeeId && { employeeId }),
      ...(documentTypeId && { documentTypeId }),
    };

    const [data, total] = await Promise.all([
      this.prisma.document.findMany({
        where,
        skip,
        take: limit,
        include: { employee: true, documentType: true },
      }),
      this.prisma.document.count({ where }),
    ]);

    return {
      page,
      limit,
      total,
      data,
    };
  }
}
