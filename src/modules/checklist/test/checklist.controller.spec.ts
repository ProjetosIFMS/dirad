import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistController } from '../checklist.controller';
import { ChecklistService } from '../checklist.service';
import {
  CreateChecklistUseCase,
  DeleteChecklistUseCase,
  FindAllChecklistUseCase,
  FindChecklistByIdUseCase,
  UpdateChecklistUseCase,
} from '../use-cases';

describe('ChecklistController', () => {
  let controller: ChecklistController;
  let service: ChecklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistController],
      providers: [
        ChecklistService,
        {
          provide: CreateChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindChecklistByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteChecklistUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ChecklistController>(ChecklistController);
    service = module.get<ChecklistService>(ChecklistService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = { name: 'Test Checklist', processId: 'process-1' };
    const mockResponse = {
      id: '1',
      ...createDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const checklists = [
      {
        id: '1',
        name: 'Test Checklist',
        processId: 'process-1',
        completedStep: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(checklists);
    expect(await controller.findAll()).toEqual(checklists);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findOne', async () => {
    const id = '1';
    const checklist = {
      id: 'checklist-1',
      name: 'Test Checklist',
      processId: 'process-1',
      completedStep: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(checklist);
    expect(await controller.findOne(id)).toEqual(checklist);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service update', async () => {
    const id = '1';
    const updateDto = { name: 'Updated Checklist', processId: 'process-1' };
    const updatedChecklist = {
      id,
      ...updateDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'update').mockResolvedValue(updatedChecklist);
    expect(await controller.update(id, updateDto)).toEqual(updatedChecklist);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service remove', async () => {
    const id = '1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
