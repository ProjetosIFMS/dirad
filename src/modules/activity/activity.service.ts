import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import {
  CreateActivityUseCase,
  DeleteActivityUseCase,
  FindAllActivityUseCase,
  UpdateActivityUseCase,
} from './use-cases';
import { FindActivityByIdUseCase } from './use-cases/find-activity.use-case';

@Injectable()
export class ActivityService {
  constructor(
    private readonly CreateActivityUseCase: CreateActivityUseCase,
    private readonly FindAllActivityUseCase: FindAllActivityUseCase,
    private readonly FindActivityByIdUseCase: FindActivityByIdUseCase,
    private readonly UpdateActivityUseCase: UpdateActivityUseCase,
    private readonly DeleteActivityUseCase: DeleteActivityUseCase,
  ) {}

  async create(data: CreateActivityDto) {
    return await this.CreateActivityUseCase.execute(data);
  }

  async findAll(includeSteps: boolean) {
    return await this.FindAllActivityUseCase.execute(includeSteps);
  }

  async findOne(id: string, includeSteps: boolean) {
    return await this.FindActivityByIdUseCase.execute(id, includeSteps);
  }

  async update(id: string, data: UpdateActivityDto) {
    return await this.UpdateActivityUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.DeleteActivityUseCase.execute(id);
  }
}
