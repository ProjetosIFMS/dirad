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
        objectDescription: data.objectDescription,
        processTypeId: data.processTypeId,
        managingUnitId: data.managingUnitId,
        modalityId: data.modalityId,
        checklistId: data.checklistId,
        costing: data.costing,
        situation: data.situation,
        estimatedValue: data.estimatedValue,
        totalValue: data.totalValue,
        supplierValue: data.supplierValue,
        object: data.object,
        adictionalInformation: data.adictionalInformation,
        priority: data.priority,
      },
    });
  }
}
