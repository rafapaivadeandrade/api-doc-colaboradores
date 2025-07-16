import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() data: CreateEmployeeDto) {
    return this.employeeService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.employeeService.update(id, data);
  }

  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    return this.employeeService.getStatus(id);
  }
}
