import { Injectable } from '@nestjs/common';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';
import { CreateStepUseCase } from './use-cases/create-step.use-case';
import { FindAllStepsUseCase } from './use-cases/find-all-step.use-case';
import { FindStepByIdUseCase } from './use-cases/find-step.use-case';
import {
  DeleteStepUseCase,
  FindAllStepByOrderUseCase,
  UpdateStepUseCase,
} from './use-cases';

@Injectable()
export class StepService {
  constructor(
    private readonly CreateStepUseCase: CreateStepUseCase,
    private readonly FindAllStepsUseCase: FindAllStepsUseCase,
    private readonly FindStepByIdUseCase: FindStepByIdUseCase,
    private readonly UpdateStepUseCase: UpdateStepUseCase,
    private readonly DeleteStepUseCase: DeleteStepUseCase,
    private readonly FindAllStepByOrderUseCase: FindAllStepByOrderUseCase,
  ) {}
  async create(data: CreateStepDto) {
    return await this.CreateStepUseCase.execute(data);
  }

  async findAll() {
    return await this.FindAllStepsUseCase.execute();
  }

  async findAllByOrder() {
    return await this.FindAllStepByOrderUseCase.execute();
  }

  async findOne(id: string) {
    return await this.FindStepByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateStepDto) {
    return await this.UpdateStepUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.DeleteStepUseCase.execute(id);
  }
}
