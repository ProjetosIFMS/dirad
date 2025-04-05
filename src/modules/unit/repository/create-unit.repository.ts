import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateUnitDto } from '../dto/create-unit.dto';

@Injectable()
export class CreateUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUnitDto) {
    const unit = await this.prisma.unit.create({
      data,
    });
    return unit;
  }
}
