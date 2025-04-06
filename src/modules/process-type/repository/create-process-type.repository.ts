import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateProcessTypeDto } from '../dto/create-process-type.dto';

@Injectable()
export class CreateProcessTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProcessTypeDto) {
    const processType = await this.prisma.processType.create({ data });
    return processType;
  }
}
