import { Injectable } from '@nestjs/common';
import {
  CreateParticipatingUnitUseCase,
  DeleteParticipatingUnitUseCase,
  FindAllParticipatingUnitByProcessUseCase,
  FindAllParticipatingUnitUseCase,
  FindParticipatingUnitByIdUseCase,
  UpdateParticipatingUnitUseCase,
} from './use-cases';
import { CreateParticipatingUnitDto } from './dto/create-participating-unit.dto';
import { UpdateParticipatingUnitDto } from './dto/update-participating-unit.dto';

@Injectable()
export class ParticipatingUnitService {
  constructor(
    private readonly createParticipatingUnitUseCase: CreateParticipatingUnitUseCase,
    private readonly updateParticipatingUnitUseCase: UpdateParticipatingUnitUseCase,
    private readonly deleteParticipatingUnitUseCase: DeleteParticipatingUnitUseCase,
    private readonly findParticipatingUnitByIdUseCase: FindParticipatingUnitByIdUseCase,
    private readonly findAllParticipatingUnitUseCase: FindAllParticipatingUnitUseCase,
    private readonly findAllParticipatinsUnitsByProcessUseCase: FindAllParticipatingUnitByProcessUseCase,
  ) {}

  create(data: CreateParticipatingUnitDto) {
    return this.createParticipatingUnitUseCase.execute(data);
  }

  update(participating_unit_id: string, data: UpdateParticipatingUnitDto) {
    return this.updateParticipatingUnitUseCase.execute(
      participating_unit_id,
      data,
    );
  }

  delete(participating_unit_id: string) {
    return this.deleteParticipatingUnitUseCase.execute(participating_unit_id);
  }

  findById(participating_unit_id: string) {
    return this.findParticipatingUnitByIdUseCase.execute(participating_unit_id);
  }

  findByProcess(process_id: string) {
    return this.findAllParticipatinsUnitsByProcessUseCase.execute(process_id);
  }

  findAll() {
    return this.findAllParticipatingUnitUseCase.execute();
  }
}
