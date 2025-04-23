import { Test, TestingModule } from '@nestjs/testing';
import { ProcessService } from '../process.service';
import {
  CreateProcessUseCase,
  DeleteProcessUseCase,
  FindAllProcessesUseCase,
  FindProcessByIdUseCase,
  UpdateProcessUseCase,
} from '../use-cases';

describe('ProcessService', () => {
  let service: ProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessService,
        {
          provide: CreateProcessUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllProcessesUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindProcessByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateProcessUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteProcessUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = {
      name: 'Test Process',
      processNumber: '123',
      processTypeId: 'type-1',
      executingUnitId: 'unit-1',
      modalityId: 'modality-1',
      situation: 'situation-1',
      estimatedValue: 1000,
      object: 'object-1',
      objectDescription: 'description',
      adictionalInformation: 'info',
      priority: 1,
      startDate: new Date(),
      createdAt: new Date(),
      expectedEndDate: new Date(),
      id: 'process-1',
    };
    await service.create(createDto);
    expect(service['createProcessUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call findAll use case', async () => {
    await service.findAll(1, 10);
    expect(service['findAllProcessesUseCase'].execute).toHaveBeenCalledWith(
      1,
      10,
    );
  });

  it('should call findOne use case', async () => {
    const id = 'test-id';
    await service.findOne(id);
    expect(service['findProcessByIdUseCase'].execute).toHaveBeenCalledWith(id);
  });

  it('should call update use case', async () => {
    const id = 'test-id';
    const updateDto = {
      name: 'Updated Process',
      processNumber: '123',
      processTypeId: 'type-1',
      executingUnitId: 'unit-1',
      modalityId: 'modality-1',
      situation: 'situation-1',
      estimatedValue: 1000,
      object: 'object-1',
      objectDescription: 'description',
    };
    await service.update(id, updateDto);
    expect(service['updateProcessUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateDto,
    );
  });

  it('should call remove use case', async () => {
    const id = 'test-id';
    await service.remove(id);
    expect(service['deleteProcessUseCase'].execute).toHaveBeenCalledWith(id);
  });
});
