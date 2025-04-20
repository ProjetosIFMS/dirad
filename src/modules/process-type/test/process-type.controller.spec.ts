import { Test, TestingModule } from '@nestjs/testing';
import { ProcessTypeController } from '../process-type.controller';
import { ProcessTypeService } from '../process-type.service';

describe('ProcessTypeController', () => {
  let controller: ProcessTypeController;
  let service: ProcessTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProcessTypeController],
      providers: [
        {
          provide: ProcessTypeService,
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

    controller = module.get<ProcessTypeController>(ProcessTypeController);
    service = module.get<ProcessTypeService>(ProcessTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call service create', async () => {
    const createDto = {
      id: 'process-type-1',
      name: 'Test Process Type',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const mockResponse = { ...createDto };
    jest.spyOn(service, 'create').mockResolvedValue(mockResponse);
    expect(await controller.create(createDto)).toEqual(mockResponse);
    expect(service.create).toHaveBeenCalledWith(createDto);
  });

  it('should call service findAll', async () => {
    const processTypes = [
      {
        id: 'process-type-1',
        name: 'Test Process Type',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(processTypes);
    expect(await controller.findAll()).toEqual(processTypes);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should call service findOne', async () => {
    const id = 'process-type-1';
    const processType = {
      id,
      name: 'Test Process Type',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    jest.spyOn(service, 'findOne').mockResolvedValue(processType);
    expect(await controller.findOne(id)).toEqual(processType);
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should call service update', async () => {
    const id = 'process-type-1';
    const updateDto = {
      id: 'process-type-1',
      name: 'Updated Process Type',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedProcessType = { ...updateDto };
    jest.spyOn(service, 'update').mockResolvedValue(updatedProcessType);
    expect(await controller.update(id, updateDto)).toEqual(updatedProcessType);
    expect(service.update).toHaveBeenCalledWith(id, updateDto);
  });

  it('should call service remove', async () => {
    const id = 'process-type-1';
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
