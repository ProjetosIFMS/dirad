import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateCompletedStepDto } from '../dto/update-completed-step.dto';

@Injectable()
export class UpdateCompletedStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateCompletedStepDto) {
    const completedStep = await this.prisma.completedStep.update({
      where: { id },
      data,
    });
    return completedStep;
  }
}
