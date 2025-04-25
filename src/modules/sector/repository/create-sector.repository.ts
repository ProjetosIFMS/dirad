import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateSectorDto } from '../dto/create-sector.dto';

@Injectable()
export class CreateSectorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateSectorDto) {
    return await this.prisma.sector.create({
      data,
    });
  }
}
