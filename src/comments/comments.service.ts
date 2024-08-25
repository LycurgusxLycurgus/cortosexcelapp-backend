import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(content: string, topicId: number, userId: number) {
    return this.prisma.comment.create({
      data: {
        content,
        topic: { connect: { id: topicId } },
        user: { connect: { id: userId } },
      },
    });
  }

  async findByTopicId(topicId: number) {
    return this.prisma.comment.findMany({
      where: { topicId },
      include: { user: { select: { username: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}