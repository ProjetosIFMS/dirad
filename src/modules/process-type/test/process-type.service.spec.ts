import { Test, TestingModule } from '@nestjs/testing';
import { ProcessTypeService } from '../process-type.service';
import {
  CreateProcessTypeUseCase,
  DeleteProcessTypeUseCase,
  FindAllProcessTypeUseCase,
  FindProcessTypeByIdUseCase,
  UpdateProcessTypeUseCase,
} from '../use-cases';

describe('ProcessTypeService', () => {
  let service: ProcessTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessTypeService,
        {
          provide: CreateProcessTypeUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllProcessTypeUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindProcessTypeByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateProcessTypeUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteProcessTypeUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProcessTypeService>(ProcessTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call create use case', async () => {
    const createDto = {
      id: 'process-type-1',
      name: 'Test Process Type',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await service.create(createDto);
    expect(service['createProcessTypeUseCase'].execute).toHaveBeenCalledWith(
      createDto,
    );
  });

  it('should call findAll use case', async () => {
    await service.findAll();
    expect(service['findAllProcessTypeUseCase'].execute).toHaveBeenCalled();
  });

  it('should call findOne use case', async () => {
    const id = 'process-type-1';
    await service.findOne(id);
    expect(service['findProcessTypeByIdUseCase'].execute).toHaveBeenCalledWith(
      id,
    );
  });

  it('should call update use case', async () => {
    const id = 'process-type-1';
    const updateDto = {
      id: 'process-type-1',
      name: 'Updated Process Type',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await service.update(id, updateDto);
    expect(service['updateProcessTypeUseCase'].execute).toHaveBeenCalledWith(
      id,
      updateDto,
    );
  });

  it('should call remove use case', async () => {
    const id = 'process-type-1';
    await service.remove(id);
    expect(service['deleteProcessTypeUseCase'].execute).toHaveBeenCalledWith(
      id,
    );
  });
});
