export class DocumentEntity {
  id: string;
  name: string;
  status: 'PENDING' | 'SENT';
  employeeId: string;
  documentTypeId: string;
}
