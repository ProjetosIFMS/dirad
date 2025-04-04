import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateStepDto } from '../dto/update-step.dto';

@Injectable()
export class UpdateStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateStep(id: string, data: UpdateStepDto) {
    const step = await this.prisma.step.update({
      where: { id },
      data,
    });
    return step;
  }
}
