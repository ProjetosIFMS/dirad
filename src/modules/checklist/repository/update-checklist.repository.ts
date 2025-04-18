import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { UpdateChecklistDto } from '../dto/update-checklist.dto';

@Injectable()
export class UpdateChecklistRepository {
  constructor(private readonly prisma: PrismaService) {}
  async update(id: string, data: UpdateChecklistDto) {
    const checklist = await this.prisma.checklist.update({
      where: { id },
      data,
    });
    return checklist;
  }
}
