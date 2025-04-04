import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindStepById(id: string) {
    return await this.prisma.step.findUnique({
      where: { id },
    });
  }
}
