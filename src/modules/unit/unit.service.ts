import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import {
  CreateUnitUseCase,
  DeleteUnitUseCase,
  FindAllUnitUseCase,
  UpdateUnitUseCase,
} from './use-cases';
import { FindUnitByIdRepository } from './repository';

@Injectable()
export class UnitService {
  constructor(
    private readonly CreateUnitUseCase: CreateUnitUseCase,
    private readonly FindAllUnitCase: FindAllUnitUseCase,
    private readonly FindUnitByIdUseCase: FindUnitByIdRepository,
    private readonly UpdateUnitUseCase: UpdateUnitUseCase,
    private readonly DeleteUnitUseCase: DeleteUnitUseCase,
  ) {}

  async create(data: CreateUnitDto) {
    return await this.CreateUnitUseCase.createUnit(data);
  }

  async findAll() {
    return await this.FindAllUnitCase.findAll();
  }

  async findOne(id: string) {
    return await this.FindUnitByIdUseCase.FindUnitById(id);
  }

  async update(id: string, data: UpdateUnitDto) {
    return await this.UpdateUnitUseCase.updateUnit(id, data);
  }

  async remove(id: string) {
    return await this.DeleteUnitUseCase.deleteUnit(id);
  }
}
