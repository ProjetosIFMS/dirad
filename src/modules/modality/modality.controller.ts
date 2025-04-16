import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModalityService } from './modality.service';
import { CreateModalityInput } from './inputs/create-modality.input';
import { UpdateModalityInput } from './inputs/update-modality.input';

@Controller('modality')
export class ModalityController {
  constructor(private readonly modalityService: ModalityService) {}

  @Post()
  create(@Body() data: CreateModalityInput) {
    return this.modalityService.create(data);
  }

  @Get()
  findAll() {
    return this.modalityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modalityService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateModalityInput) {
    return this.modalityService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modalityService.remove(id);
  }
}
