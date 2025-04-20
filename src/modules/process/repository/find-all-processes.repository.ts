import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindAllProcessesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findProcesses() {
    return await this.prisma.process.findMany({
      include: {
        processType: true,
        executingUnit: true,
        participatingUnits: true,
        modality: true,
      },
    });
  }
}
