import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class FindAllChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const checklists = await this.prisma.checklist.findMany();
    return checklists;
  }
}
