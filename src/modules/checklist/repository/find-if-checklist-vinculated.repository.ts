import { PrismaService } from '../../../shared/databases/prisma.database';

export class FindIfChecklistVinculatedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findIfVinculated(checklistId: string) {
    const hasProcess =
      (await this.prisma.checklist.findUnique({
        where: {
          id: checklistId,
          process: {
            isNot: null,
          },
        },
        select: {},
      })) !== null;
    return hasProcess;
  }
}
