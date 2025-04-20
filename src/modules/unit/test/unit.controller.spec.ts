import { Test, TestingModule } from '@nestjs/testing';
import { UnitController } from '../unit.controller';
import { UnitService } from '../unit.service';
import {
  CreateUnitUseCase,
  DeleteUnitUseCase,
  FindAllUnitUseCase,
  FindUnitByIdUseCase,
  UpdateUnitUseCase,
} from '../use-cases';

describe('UnitController', () => {
  let controller: UnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitController],
      providers: [
        UnitService,
        {
          provide: CreateUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindAllUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: FindUnitByIdUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: UpdateUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: DeleteUnitUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UnitController>(UnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
