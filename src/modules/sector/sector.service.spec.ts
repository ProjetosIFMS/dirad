import { Test, TestingModule } from '@nestjs/testing';
import { SectorService } from './sector.service';
import {
  CreateSectorUseCase,
  FindAllSectorUseCase,
  FindSectorByIdUseCase,
  UpdateSectorUseCase,
  DeleteSectorUseCase,
} from './use-cases';

const mockCreateSectorUseCase = { execute: jest.fn() };
const mockFindAllSectorUseCase = { execute: jest.fn() };
const mockFindSectorByIdUseCase = { execute: jest.fn() };
const mockUpdateSectorUseCase = { execute: jest.fn() };
const mockDeleteSectorUseCase = { execute: jest.fn() };

describe('SectorService', () => {
  let service: SectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectorService,
        { provide: CreateSectorUseCase, useValue: mockCreateSectorUseCase },
        { provide: FindAllSectorUseCase, useValue: mockFindAllSectorUseCase },
        { provide: FindSectorByIdUseCase, useValue: mockFindSectorByIdUseCase },
        { provide: UpdateSectorUseCase, useValue: mockUpdateSectorUseCase },
        { provide: DeleteSectorUseCase, useValue: mockDeleteSectorUseCase },
      ],
    }).compile();

    service = module.get<SectorService>(SectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
