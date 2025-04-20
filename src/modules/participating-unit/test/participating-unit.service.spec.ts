import { Test, TestingModule } from '@nestjs/testing';
import { ParticipatingUnitService } from '../participating-unit.service';
import {
  CreateParticipatingUnitUseCase,
  DeleteParticipatingUnitUseCase,
  FindAllParticipatingUnitByProcessUseCase,
  FindAllParticipatingUnitUseCase,
  FindParticipatingUnitByIdUseCase,
  UpdateParticipatingUnitUseCase,
} from '../use-cases';

describe('ParticipatingUnitService', () => {
  let service: ParticipatingUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipatingUnitService,
        {
          provide: CreateParticipatingUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllParticipatingUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindParticipatingUnitByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateParticipatingUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteParticipatingUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllParticipatingUnitByProcessUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ParticipatingUnitService>(ParticipatingUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = {
      id: 'participating-unit-1',
      unitId: 'unit-1',
      processId: 'process-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await service.create(createDto);
    expect(
      service['createParticipatingUnitUseCase'].execute,
    ).toHaveBeenCalledWith(createDto);
  });

  it('should call findAll use case', async () => {
    await service.findAll();
    expect(
      service['findAllParticipatingUnitUseCase'].execute,
    ).toHaveBeenCalled();
  });

  it('should call findOne use case', async () => {
    const id = 'test-id';
    await service.findById(id);
    expect(
      service['findParticipatingUnitByIdUseCase'].execute,
    ).toHaveBeenCalledWith(id);
  });

  it('should call findByProcess use case', async () => {
    const processId = 'process-1';
    await service.findByProcess(processId);
    expect(
      service['findAllParticipatinsUnitsByProcessUseCase'].execute,
    ).toHaveBeenCalledWith(processId);
  });

  it('should call update use case', async () => {
    const id = 'test-id';
    const updateDto = {
      unitId: 'unit-1',
      processId: 'process-1',
    };
    await service.update(id, updateDto);
    expect(
      service['updateParticipatingUnitUseCase'].execute,
    ).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call delete use case', async () => {
    const id = 'test-id';
    await service.delete(id);
    expect(
      service['deleteParticipatingUnitUseCase'].execute,
    ).toHaveBeenCalledWith(id);
  });
});
