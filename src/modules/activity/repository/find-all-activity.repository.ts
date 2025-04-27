import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(includeSteps: boolean) {
    return await this.prisma.activity.findMany({
      include: {
        step: includeSteps
          ? {
              include: {
                originSector: true,
                destinySector: true,
              },
            }
          : false,
      },
    });
  }
}
