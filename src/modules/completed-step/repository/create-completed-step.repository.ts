import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateCompletedStepDto } from '../dto/create-completed-step.dto';

@Injectable()
export class CreateCompletedStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompletedStepDto) {
    const completedstep = await this.prisma.completedStep.create({
      data,
    });
    return completedstep;
  }
}
