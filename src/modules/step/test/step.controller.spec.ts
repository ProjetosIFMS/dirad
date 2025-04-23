import { Test, TestingModule } from '@nestjs/testing';
import { StepController } from '../step.controller';
import { StepService } from '../step.service';
import { Status } from '../types/Status';

describe('StepController', () => {
  let controller: StepController;
  let service: StepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StepController],
      providers: [
        {
          provide: StepService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StepController>(StepController);
    service = module.get<StepService>(StepService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = {
      id: 'step-1',
      description: 'Test Step',
      origin: 'Origin',
      destiny: 'Destiny',
      estimatedCompletionDays: new Date(),
      status: Status.PENDING,
      order: 1,
      activityId: 'activity-1',
      modalityId: 'modality-1',
    };
    const mockResponse = { ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const steps = [
      {
        id: 'step-1',
        description: 'Test Step',
        origin: 'Origin',
        destiny: 'Destiny',
        estimatedCompletionDays: new Date(),
        status: Status.COMPLETED,
        order: 1,
        activityId: 'activity-1',
        modalityId: 'modality-1',
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(steps);
    expect(await controller.findAll()).toEqual(steps);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findOne', async () => {
    const id = 'step-1';
    const step = {
      id,
      description: 'Test Step',
      origin: 'Origin',
      destiny: 'Destiny',
      estimatedCompletionDays: new Date(),
      status: Status.PENDING,
      order: 1,
      activityId: 'activity-1',
      modalityId: 'modality-1',
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(step);
    expect(await controller.findOne(id)).toEqual(step);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service update', async () => {
    const id = 'step-1';
    const updateDto = {
      description: 'Updated Step',
      origin: 'New Origin',
      destiny: 'New Destiny',
      estimatedCompletionDays: new Date(),
      status: Status.COMPLETED,
      order: 2,
      activityId: 'activity-1',
      modalityId: 'modality-1',
    };
    const updatedStep = { id, ...updateDto };
    jest.spyOn(service, 'update').mockResolvedValue(updatedStep);
    expect(await controller.update(id, updateDto)).toEqual(updatedStep);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service remove', async () => {
    const id = 'step-1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
