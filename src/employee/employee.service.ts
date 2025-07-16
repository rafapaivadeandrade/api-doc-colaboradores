import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeService {
  findAll() {
    return 'Serviço de listagem de colaboradores';
  }
}
