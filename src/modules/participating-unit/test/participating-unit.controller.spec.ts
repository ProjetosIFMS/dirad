import { Test, TestingModule } from '@nestjs/testing';
import { ParticipatingUnitController } from '../participating-unit.controller';
import { ParticipatingUnitService } from '../participating-unit.service';
import {
  CreateParticipatingUnitUseCase,
  DeleteParticipatingUnitUseCase,
  FindAllParticipatingUnitByProcessUseCase,
  FindAllParticipatingUnitUseCase,
  FindParticipatingUnitByIdUseCase,
  UpdateParticipatingUnitUseCase,
} from '../use-cases';

describe('ParticipatingUnitController', () => {
  let controller: ParticipatingUnitController;
  let service: ParticipatingUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParticipatingUnitController],
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

    controller = module.get<ParticipatingUnitController>(
      ParticipatingUnitController,
    );
    service = module.get<ParticipatingUnitService>(ParticipatingUnitService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = {
      id: 'participating-unit-1',
      unitId: 'unit-1',
      processId: 'process-1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockResponse = { ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const participatingUnits = [
      {
        id: 'participating-unit-1',
        unitId: 'unit-1',
        processId: 'process-1',
        createdAt: new Date(),
        updatedAt: new Date(),
        unit: {
          id: 'unit-1',
          name: 'Test Unit',
          shortName: 'TU',
          color: '#000000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(participatingUnits);
    expect(await controller.findAll()).toEqual(participatingUnits);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findOne', async () => {
    const id = 'participating-unit-1';
    const participatingUnit = {
      id,
      unitId: 'unit-1',
      processId: 'process-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      unit: {
        id: 'unit-1',
        name: 'Test Unit',
        shortName: 'TU',
        color: '#000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    jest.spyOn(service, 'findById').mockResolvedValue(participatingUnit);
    expect(await controller.findOne(id)).toEqual(participatingUnit);
    expect(service.findById).toHaveBeenCalledWith(id);
  });

  it('should call service findByProcess', async () => {
    const processId = 'process-1';
    const participatingUnits = [
      {
        id: 'participating-unit-1',
        unitId: 'unit-1',
        processId,
        createdAt: new Date(),
        updatedAt: new Date(),
        unit: {
          id: 'unit-1',
          name: 'Test Unit',
          shortName: 'TU',
          color: '#000000',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    ];
    jest.spyOn(service, 'findByProcess').mockResolvedValue(participatingUnits);
    expect(await controller.findAllUnits(processId)).toEqual(
      participatingUnits,
    );
    expect(service.findByProcess).toHaveBeenCalledWith(processId);
  });

  it('should call service update', async () => {
    const id = 'participating-unit-1';
    const updateDto = {
      unitId: 'unit-1',
      processId: 'process-1',
    };
    const updatedParticipatingUnit = {
      id,
      ...updateDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      unit: {
        id: 'unit-1',
        name: 'Test Unit',
        shortName: 'TU',
        color: '#000000',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedParticipatingUnit);
    expect(await controller.update(id, updateDto)).toEqual(
      updatedParticipatingUnit,
    );
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service delete', async () => {
    const id = 'participating-unit-1';
    jest.spyOn(service, 'delete').mockResolvedValue(undefined);
    await controller.delete(id);
    expect(service.delete).toHaveBeenCalledWith(id);
  });
});
