import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { CreateProcessDto } from '../dto/create-process.dto';

@Injectable()
export class CreateProcessRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createProcess(data: CreateProcessDto) {
    return await this.prisma.process.create({
      data: {
        processNumber: data.processNumber,
        processTypeId: data.processTypeId,
        executingUnitId: data.executingUnitId,
        modalityId: data.modalityId,
        checklistId: data.checklistId,
        costing: data.costing,
        situation: data.situation,
        estimatedValue: data.estimatedValue,
        ...(data.participatingUnits && data.participatingUnits.length > 0
          ? {
              participatingUnits: {
                create: data.participatingUnits.map((unitId) => ({
                  unitId,
                  processId: data.id,
                })),
              },
            }
          : {}),
        totalValue: data.totalValue,
        supplierValue: data.supplierValue,
        object: data.object,
        objectDescription: data.objectDescription,
        adictionalInformation: data.adictionalInformation,
        priority: data.priority,
        expectedEndDate: data.expectedEndDate,
        startDate: data.startDate,
      },
    });
  }
}
