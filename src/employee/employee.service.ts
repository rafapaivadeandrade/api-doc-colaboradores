import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.employee.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.employee.update({ where: { id }, data });
  }

  async getStatus(id: string) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: {
        documents: {
          include: { documentType: true },
        },
      },
    });

    if (!employee) throw new NotFoundException('Employee not found');

    const sent = employee.documents.filter((d) => d.status === 'SENT');
    const pending = employee.documents.filter((d) => d.status === 'PENDING');

    return {
      employee: employee.name,
      sent: sent.map((d) => d.documentType.name),
      pending: pending.map((d) => d.documentType.name),
    };
  }
}
