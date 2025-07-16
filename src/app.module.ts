import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { DocumentTypeModule } from './document-type/document-type.module';
import { DocumentModule } from './document/document.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, EmployeeModule, DocumentModule, DocumentTypeModule],
})
export class AppModule {}
