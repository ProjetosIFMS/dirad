import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindCheckListByIdRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string, includeStep = false) {
    const checklists = await this.prisma.checklist.findUnique({
      where: {
        id,
      },
      include: {
        completedStep: {
          include: {
            step: includeStep,
          },
        },
      },
    });
    return checklists;
  }
}
