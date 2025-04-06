import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class DeleteProcessTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: string) {
    const processType = await this.prisma.processType.delete({
      where: { id },
    });
    return processType;
  }
}
