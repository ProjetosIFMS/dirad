import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllProcessTypeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.processType.findMany();
  }
}
