import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class LinkDocumentDto {
  @IsUUID()
  employeeId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  documentTypeIds: string[];
}
