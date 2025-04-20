import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateProcessDto } from '../dto/create-process.dto';

@Injectable()
export class CreateProcessRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProcess(data: CreateProcessDto) {
    const {
      processTypeId,
      participatingUnits,
      executingUnitId,
      modalityId,
      ...processData
    } = data;

    return await this.prisma.process.create({
      data: {
        processTypeId,
        executingUnitId,
        modalityId,
        ...processData,
        participatingUnits: {
          create: participatingUnits?.map((unitId) => ({
            unitId,
          })),
        },
      },
      include: {
        participatingUnits: true,
      },
    });
  }
}
