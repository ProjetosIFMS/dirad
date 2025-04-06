import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllStepsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindAll() {
    return await this.prisma.step.findMany();
  }
}
