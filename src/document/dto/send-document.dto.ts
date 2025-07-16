import { IsUUID } from 'class-validator';

export class SendDocumentDto {
  @IsUUID()
  employeeId: string;

  @IsUUID()
  documentTypeId: string;
}
