import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeService } from './employee.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let prisma: PrismaService;

  const mockPrismaService = {
    employee: {
      create: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Rafael',
        document: '07833313475',
        hiredAt: new Date(),
      }),
      update: jest.fn().mockResolvedValue({
        id: '1',
        name: 'Rafael Paiva',
        document: '07833313475',
        hiredAt: new Date(),
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new employee', async () => {
    const result = await service.create({
      name: 'Rafael',
      document: '07833313475',
      hiredAt: new Date(),
    });
    expect(prisma.employee.create).toHaveBeenCalled();
    expect(result.name).toBe('Rafael');
  });

  it('should update an employee', async () => {
    const result = await service.update('1', {
      name: 'Rafael Paiva',
      document: '07833313475',
      hiredAt: new Date(),
    });
    expect(prisma.employee.update).toHaveBeenCalled();
    expect(result.name).toBe('Rafael Paiva');
  });
});
