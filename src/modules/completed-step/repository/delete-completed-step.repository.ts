import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteCompletedStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const completedStep = await this.prisma.completedStep.delete({
      where: { id },
    });

    return completedStep;
  }
}
