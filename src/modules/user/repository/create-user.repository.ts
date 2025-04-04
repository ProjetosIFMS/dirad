import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/databases/prisma.database';
import { CreateUserInput } from '../inputs/create-user.input';
@Injectable()
export class CreateUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserInput) {
    return await this.prisma.user.create({
      data,
    });
  }
}
