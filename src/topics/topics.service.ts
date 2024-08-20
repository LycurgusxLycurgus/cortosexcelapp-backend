import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(content: string, userId: number) {
    return this.prisma.topic.create({
      data: {
        content,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.topic.findMany({
      include: { user: { select: { username: true } } },
    });
  }
}