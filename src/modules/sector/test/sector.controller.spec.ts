import { Test, TestingModule } from '@nestjs/testing';
import { SectorController } from '../sector.controller';
import { SectorService } from '../sector.service';
import {
  CreateSectorUseCase,
  FindAllSectorUseCase,
  FindSectorByIdUseCase,
  UpdateSectorUseCase,
  DeleteSectorUseCase,
} from '../use-cases';

// Mock data
const mockSector = {
  id: '1',
  shortName: 'HR',
  description: 'Human Resources',
  responsible_name: 'John Doe',
  responsible_email: 'john.doe@example.com',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockCreateSectorUseCase = { execute: jest.fn(() => mockSector) };
const mockFindAllSectorUseCase = { execute: jest.fn(() => [mockSector]) };
const mockFindSectorByIdUseCase = { execute: jest.fn(() => mockSector) };
const mockUpdateSectorUseCase = { execute: jest.fn(() => mockSector) };
const mockDeleteSectorUseCase = { execute: jest.fn(() => mockSector) };

describe('SectorController', () => {
  let controller: SectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectorController],
      providers: [
        SectorService,
        { provide: CreateSectorUseCase, useValue: mockCreateSectorUseCase },
        { provide: FindAllSectorUseCase, useValue: mockFindAllSectorUseCase },
        { provide: FindSectorByIdUseCase, useValue: mockFindSectorByIdUseCase },
        { provide: UpdateSectorUseCase, useValue: mockUpdateSectorUseCase },
        { provide: DeleteSectorUseCase, useValue: mockDeleteSectorUseCase },
      ],
    }).compile();

    controller = module.get<SectorController>(SectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all sectors', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockSector]);
  });

  it('should return a single sector', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(mockSector);
  });

  it('should create a sector', async () => {
    const dto = {
      shortName: 'IT',
      description: 'Information Technology',
      responsible_name: 'Jane Doe',
      responsible_email: 'jane.doe@example.com',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockSector);
  });

  it('should update a sector', async () => {
    const dto = { shortName: 'IT Updated', description: 'Updated Description' };
    const result = await controller.update('1', dto);
    expect(result).toEqual(mockSector);
  });

  it('should delete a sector', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual(mockSector);
  });
});
