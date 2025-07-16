import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class UnlinkDocumentDto {
  @IsUUID()
  employeeId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  documentTypeIds: string[];
}
