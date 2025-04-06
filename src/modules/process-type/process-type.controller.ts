import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProcessTypeService } from './process-type.service';
import { CreateProcessTypeDto } from './dto/create-process-type.dto';
import { UpdateProcessTypeDto } from './dto/update-process-type.dto';

@Controller('process-type')
export class ProcessTypeController {
  constructor(private readonly processTypeService: ProcessTypeService) {}

  @Post()
  create(@Body() createProcessTypeDto: CreateProcessTypeDto) {
    return this.processTypeService.create(createProcessTypeDto);
  }

  @Get()
  findAll() {
    return this.processTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProcessTypeDto) {
    return this.processTypeService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processTypeService.remove(id);
  }
}
