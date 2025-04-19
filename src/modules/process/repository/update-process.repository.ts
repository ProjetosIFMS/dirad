import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/databases/prisma.database';
import { UpdateProcessDto } from '../dto/update-process.dto';

@Injectable()
export class UpdateProcessRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateProcess(id: string, data: UpdateProcessDto) {
    const {
      processTypeId,
      executingUnitId,
      modalityId,
      participatingUnits,
      checklistId,
      ...directFields
    } = data;

    const dataObj = {
      ...directFields,
      checklistId: checklistId,
      ...(processTypeId && {
        processType: { connect: { id: processTypeId } },
      }),
      ...(executingUnitId && {
        executingUnit: { connect: { id: executingUnitId } },
      }),
      ...(modalityId && {
        modality: { connect: { id: modalityId } },
      }),
      ...(participatingUnits && {
        participatingUnits: {
          create: participatingUnits.map((unit) => ({
            unitId: unit.unitId,
          })),
        },
      }),
    };
    const updatedProcess = await this.prisma.process.update({
      where: { id },
      data: dataObj,
    });
    return updatedProcess;
  }
}
