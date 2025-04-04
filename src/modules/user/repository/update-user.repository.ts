import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';

@Injectable()
export class UpdateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
