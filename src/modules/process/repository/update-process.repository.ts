import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateProcessDto } from '../dto/update-process.dto';

@Injectable()
export class UpdateProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProcess(id: string, data: UpdateProcessDto) {
    return await this.prisma.process.update({
      where: { id },
      data: {
        processNumber: data.processNumber,
        processTypeId: data.processTypeId,
        managingUnitId: data.managingUnitId,
        checklistId: data.checklistId,
        costing: data.costing,
        situation: data.situation,
        estimatedValue: data.estimatedValue,
        totalValue: data.totalValue,
        supplierValue: data.supplierValue,
        object: data.object,
        objectDescription: data.objectDescription,
        adictionalInformation: data.adictionalInformation,
        priority: data.priority,
      },
    });
  }
}
