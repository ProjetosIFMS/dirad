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
        processType: { connect: { id: data.processTypeId } },
        managingUnit: { connect: { id: data.managingUnitId } },
        ...(data.checklistId
          ? { checklist: { connect: { id: data.checklistId } } }
          : {}),
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
