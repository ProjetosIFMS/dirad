import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class DeleteStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const step = await this.prisma.step.delete({
      where: { id },
    });
    return step;
  }
}
