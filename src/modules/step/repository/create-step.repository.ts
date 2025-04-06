import { Injectable } from '@nestjs/common';
import { CreateStepDto } from '../dto/create-step.dto';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStepDto) {
    const step = await this.prisma.step.create({
      data,
    });
    return step;
  }
}
