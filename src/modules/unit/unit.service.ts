import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import {
  CreateUnitUseCase,
  DeleteUnitUseCase,
  FindAllUnitUseCase,
  FindUnitByIdUseCase,
  UpdateUnitUseCase,
} from './use-cases';

@Injectable()
export class UnitService {
  constructor(
    private readonly CreateUnitUseCase: CreateUnitUseCase,
    private readonly FindAllUnitCase: FindAllUnitUseCase,
    private readonly FindUnitByIdUseCase: FindUnitByIdUseCase,
    private readonly UpdateUnitUseCase: UpdateUnitUseCase,
    private readonly DeleteUnitUseCase: DeleteUnitUseCase,
  ) {}

  async create(data: CreateUnitDto) {
    return await this.CreateUnitUseCase.execute(data);
  }

  async findAll() {
    return await this.FindAllUnitCase.execute();
  }

  async findOne(id: string) {
    return await this.FindUnitByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateUnitDto) {
    return await this.UpdateUnitUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.DeleteUnitUseCase.execute(id);
  }
}
