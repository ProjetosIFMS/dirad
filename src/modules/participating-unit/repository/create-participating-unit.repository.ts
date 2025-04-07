import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateParticipatingUnitDto } from '../dto/create-participating-unit.dto';

@Injectable()
export class CreateParticipatingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateParticipatingUnitDto) {
    const participating_unit = await this.prisma.participatingUnit.create({
      data,
    });
    return participating_unit;
  }
}
