import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from '../activity.controller';
import { ActivityService } from '../activity.service';
import {
  CreateActivityUseCase,
  DeleteActivityUseCase,
  FindAllActivityUseCase,
  FindActivityByIdUseCase,
  UpdateActivityUseCase,
} from '../use-cases';

describe('ActivityController', () => {
  let controller: ActivityController;
  let service: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        ActivityService,
        {
          provide: CreateActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindActivityByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteActivityUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = {
      id: 'activity-1',
      name: 'Test Activity',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockResponse = { ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const activities = [
      {
        id: 'activity-1',
        name: 'Test Activity',
        description: 'Test Description',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(activities);
    expect(await controller.findAll()).toEqual(activities);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findOne', async () => {
    const id = 'activity-1';
    const activity = {
      id,
      name: 'Test Activity',
      description: 'Test Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(activity);
    expect(await controller.findOne(id)).toEqual(activity);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service update', async () => {
    const id = 'activity-1';
    const updateDto = {
      name: 'Updated Activity',
      description: 'Updated Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedActivity = { id, ...updateDto };
    jest.spyOn(service, 'update').mockResolvedValue(updatedActivity);
    expect(await controller.update(id, updateDto)).toEqual(updatedActivity);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service remove', async () => {
    const id = 'activity-1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
