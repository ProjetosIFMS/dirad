import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dto/create-sector.dto';
import { UpdateSectorDto } from './dto/update-sector.dto';
import {
  CreateSectorUseCase,
  DeleteSectorUseCase,
  FindAllSectorUseCase,
  FindSectorByIdUseCase,
  UpdateSectorUseCase,
} from './use-cases';

@Injectable()
export class SectorService {
  constructor(
    private readonly createSectorUseCase: CreateSectorUseCase,
    private readonly findAllSectorUseCase: FindAllSectorUseCase,
    private readonly findSectorByIdUseCase: FindSectorByIdUseCase,
    private readonly updateSectorUseCase: UpdateSectorUseCase,
    private readonly deleteSectorUseCase: DeleteSectorUseCase,
  ) {}
  async create(data: CreateSectorDto) {
    return await this.createSectorUseCase.execute(data);
  }

  async findAll() {
    return await this.findAllSectorUseCase.execute();
  }

  async findOne(id: string) {
    return await this.findSectorByIdUseCase.execute(id);
  }

  async update(id: string, data: UpdateSectorDto) {
    return await this.updateSectorUseCase.execute(id, data);
  }

  async remove(id: string) {
    return await this.deleteSectorUseCase.execute(id);
  }
}
