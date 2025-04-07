import { Injectable } from '@nestjs/common';
import { CreateChecklistDto } from '../dto/create-checklist.dto';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class CreateChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateChecklistDto) {
    const checklist = await this.prisma.checklist.create({ data });
    return checklist;
  }
}
