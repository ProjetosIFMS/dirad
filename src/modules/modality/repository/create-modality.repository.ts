import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateModalityInput } from '../inputs/create-modality.input';

@Injectable()
export class CreateModalityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateModalityInput) {
    const modality = await this.prisma.modality.create({
      data,
    });
    return modality;
  }
}
