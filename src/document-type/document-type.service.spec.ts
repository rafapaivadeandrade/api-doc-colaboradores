import { Test, TestingModule } from '@nestjs/testing';
import { DocumentTypeService } from './document-type.service';
import { PrismaService } from '../prisma/prisma.service';

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;
  let prisma: PrismaService;

  const mockPrismaService = {
    documentType: {
      create: jest.fn().mockResolvedValue({ id: '1', name: 'CPF' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentTypeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DocumentTypeService>(DocumentTypeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new document type', async () => {
    const result = await service.create({ name: 'CPF' });
    expect(result).toEqual({ id: '1', name: 'CPF' });
    expect(prisma.documentType.create).toHaveBeenCalledWith({
      data: { name: 'CPF' },
    });
  });
});
