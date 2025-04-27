import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllStepsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async FindAll() {
    return await this.prisma.step.findMany({
      select: {
        id: true,
        description: true,
        template: true,
        estimatedCompletionDays: true,
        status: true,
        order: true,
        activityId: true,
        modalityId: true,
        originSector: {
          select: {
            id: true,
            shortName: true,
            description: true,
            responsible_name: true,
            responsible_email: true,
          },
        },
        destinySector: {
          select: {
            id: true,
            shortName: true,
            description: true,
            responsible_name: true,
            responsible_email: true,
          },
        },
      },
    });
  }
}
