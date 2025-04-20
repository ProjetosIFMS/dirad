import { Test, TestingModule } from '@nestjs/testing';
import { UnitService } from '../unit.service';
import {
  CreateUnitUseCase,
  DeleteUnitUseCase,
  FindAllUnitUseCase,
  FindUnitByIdUseCase,
  UpdateUnitUseCase,
} from '../use-cases';

describe('UnitService', () => {
  let service: UnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UnitService>(UnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
