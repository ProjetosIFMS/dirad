import { Injectable } from '@nestjs/common';
import { CreateStepDto } from '../dto/create-step.dto';
import { PrismaService } from 'src/shared/databases/prisma.database';

@Injectable()
export class CreateStepRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateStepDto) {
    const step = await this.prisma.step.create({
      data: {
        id: data.id,
        description: data.description,
        originSector: {
          connect: {
            id: data.originSectorId,
          },
        },
        destinySector: {
          connect: {
            id: data.destinySectorId,
          },
        },
        template: data.template,
        estimatedCompletionDays: data.estimatedCompletionDays,
        status: data.status,
        order: data.order,
        ...(data.activityId && {
          activity: {
            connect: {
              id: data.activityId,
            },
          },
        }),
        ...(data.modalityId && {
          modality: {
            connect: {
              id: data.modalityId,
            },
          },
        }),
      },
    });
    return step;
  }
}
