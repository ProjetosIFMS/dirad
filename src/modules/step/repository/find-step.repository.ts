import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindStepByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindById(id: string) {
    return await this.prisma.step.findUnique({
      where: { id },
    });
  }
}
