import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindActivityByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string, includeSteps: boolean = false) {
    return await this.prisma.activity.findUnique({
      where: { id },
      include: {
        step: includeSteps,
      },
    });
  }
}
