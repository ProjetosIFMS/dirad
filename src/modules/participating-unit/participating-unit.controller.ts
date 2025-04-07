import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParticipatingUnitService } from './participating-unit.service';
import { CreateParticipatingUnitDto } from './dto/create-participating-unit.dto';
import { UpdateParticipatingUnitDto } from './dto/update-participating-unit.dto';

@Controller('participating-unit')
export class ParticipatingUnitController {
  constructor(
    private readonly participatingUnitService: ParticipatingUnitService,
  ) {}

  @Post()
  create(@Body() data: CreateParticipatingUnitDto) {
    return this.participatingUnitService.create(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateParticipatingUnitDto) {
    return this.participatingUnitService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.participatingUnitService.delete(id);
  }

  @Get(':process_id')
  findAllUnits(@Param('process_id') process_id: string) {
    return this.participatingUnitService.findByProcess(process_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participatingUnitService.findById(id);
  }

  @Get()
  findAll() {
    return this.participatingUnitService.findAll();
  }
}
