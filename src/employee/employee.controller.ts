import { Controller, Get } from '@nestjs/common';

@Controller('employees')
export class EmployeeController {
  @Get()
  getAll() {
    return 'Listar colaboradores';
  }
}
