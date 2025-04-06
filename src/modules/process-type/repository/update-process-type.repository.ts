import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateProcessTypeDto } from '../dto/update-process-type.dto';

@Injectable()
export class UpdateProcessTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async update(id: string, data: UpdateProcessTypeDto) {
    const processType = await this.prisma.processType.update({
      where: { id },
      data,
    });
    return processType;
  }
}
