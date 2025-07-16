import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentStatus } from '@prisma/client';

describe('DocumentService', () => {
  let service: DocumentService;
  let prisma: PrismaService;

  const mockPrismaService = {
    document: {
      createMany: jest.fn().mockResolvedValue({ count: 2 }),
      deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      update: jest.fn().mockResolvedValue({ status: DocumentStatus.SENT }),
      findMany: jest.fn().mockResolvedValue([
        {
          id: 'doc1',
          name: 'CPF',
          status: DocumentStatus.PENDING,
          employeeId: 'emp1',
          documentTypeId: 'dt1',
        },
      ]),
      count: jest.fn().mockResolvedValue(1),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should link documents', async () => {
    const result = await service.linkDocuments({
      employeeId: '123',
      documentTypeIds: ['a', 'b'],
    });
    expect(prisma.document.createMany).toHaveBeenCalled();
    expect(result.count).toBe(2);
  });

  it('should unlink documents', async () => {
    const result = await service.unlinkDocuments({
      employeeId: '123',
      documentTypeIds: ['a'],
    });
    expect(prisma.document.deleteMany).toHaveBeenCalled();
    expect(result.count).toBe(1);
  });

  it('should return pending documents', async () => {
    const result = await service.getPendingDocuments(undefined);

    expect(Array.isArray(result.data)).toBe(true);
    expect(result.data.length).toBeGreaterThan(0);
    expect(result.data[0].status).toBe(DocumentStatus.PENDING);
  });
});
