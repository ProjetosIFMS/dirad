import { Test, TestingModule } from '@nestjs/testing';
import { ProcessController } from '../process.controller';
import { ProcessService } from '../process.service';
import {
  CreateProcessUseCase,
  DeleteProcessUseCase,
  FindAllProcessesUseCase,
  FindProcessByIdUseCase,
  UpdateProcessUseCase,
} from '../use-cases';
import { Status } from '../types/Status';

describe('ProcessController', () => {
  let controller: ProcessController;
  let service: ProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessController],
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

    controller = module.get<ProcessController>(ProcessController);
    service = module.get<ProcessService>(ProcessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = {
      name: 'Test Process',
      processNumber: '123',
      processTypeId: 'type-1',
      executingUnitId: 'unit-1',
      modalityId: 'modality-1',
      situation: Status.COMPLETED,
      estimatedValue: 1000,
      object: 'object-1',
      objectDescription: 'description',
      adictionalInformation: 'info',
      priority: 1,
      startDate: new Date(),
      createdAt: new Date(),
      expectedEndDate: new Date(),
      id: 'process-1',
      updatedAt: new Date(),
      checklistId: 'checklist-1',
    };
    const mockResponse = {
      ...createDto,
      participatingUnits: [],
      processType: {
        name: 'Type',
        id: 'type-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      executingUnit: {
        name: 'Unit',
        id: 'unit-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'red',
        shortName: 'U',
      },
      modality: {
        name: 'Modality',
        id: 'modality-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const processes = [
      {
        id: 'process-1',
        name: 'Test Process',
        processNumber: '123',
        processTypeId: 'type-1',
        executingUnitId: 'unit-1',
        modalityId: 'modality-1',
        situation: Status.COMPLETED,
        estimatedValue: 1000,
        object: 'object-1',
        objectDescription: 'description',
        adictionalInformation: 'info',
        priority: 1,
        startDate: new Date(),
        createdAt: new Date(),
        expectedEndDate: new Date(),
        updatedAt: new Date(),
        checklistId: 'checklist-1',
        executingUnit: {
          name: 'Unit',
          id: 'unit-1',
          createdAt: new Date(),
          updatedAt: new Date(),
          color: 'red',
          shortName: 'U',
        },
        processType: {
          name: 'Type',
          id: 'type-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        modality: {
          name: 'Modality',
          id: 'modality-1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        participatingUnits: [],
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(processes);
    expect(await controller.findAll(1, 10, 'unit1', 'punit1')).toEqual(
      processes,
    );
    expect(service.findAll).toHaveBeenCalledWith(
      1,
      10,
      'unit1',
      'punit1',
      undefined,
    );
  });

  it('should call service findOne', async () => {
    const id = '1';
    const process = {
      id,
      name: 'Test Process',
      processNumber: '123',
      processTypeId: 'type-1',
      executingUnitId: 'unit-1',
      modalityId: 'modality-1',
      situation: Status.COMPLETED,
      estimatedValue: 1000,
      object: 'object-1',
      objectDescription: 'description',
      adictionalInformation: 'info',
      priority: 1,
      startDate: new Date(),
      createdAt: new Date(),
      expectedEndDate: new Date(),
      updatedAt: new Date(),
      checklistId: 'checklist-1',
      modality: {
        name: 'Modality',
        id: 'modality-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      processType: {
        name: 'Type',
        id: 'type-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      executingUnit: {
        name: 'Unit',
        id: 'unit-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'red',
        shortName: 'U',
      },
      participatingUnits: [],
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(process);
    expect(await controller.findOne(id)).toEqual(process);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service update', async () => {
    const id = '1';
    const updateDto = {
      name: 'Updated Process',
      processNumber: '123',
      processTypeId: 'type-1',
      executingUnitId: 'unit-1',
      modalityId: 'modality-1',
      situation: Status.COMPLETED,
      estimatedValue: 1000,
      object: 'object-1',
      objectDescription: 'description',
      adictionalInformation: 'info',
      priority: 1,
      startDate: new Date(),
      expectedEndDate: new Date(),
    };
    const updatedProcess = {
      ...updateDto,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      checklistId: 'checklist-1',
      participatingUnits: [],
      processType: {
        name: 'Type',
        id: 'type-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      executingUnit: {
        name: 'Unit',
        id: 'unit-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        color: 'red',
        shortName: 'U',
      },
      modality: {
        name: 'Modality',
        id: 'modality-1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedProcess);
    expect(await controller.update(id, updateDto)).toEqual(updatedProcess);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service remove', async () => {
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
