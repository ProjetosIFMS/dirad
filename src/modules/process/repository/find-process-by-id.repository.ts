import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class FindProcessByIdRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(process_id: string) {
    return await this.prisma.process.findUnique({
      where: {
        id: process_id,
      },
      include: {
        processType: true,
        executingUnit: true,
        modality: true,
        participatingUnits: {
          include: {
            unit: true,
          },
        },
      },
    });
  }
}
