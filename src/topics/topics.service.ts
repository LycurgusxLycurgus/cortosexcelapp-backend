import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Topic } from '@prisma/client';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(content: string, priority: number, userId: number) {
    return this.prisma.topic.create({
      data: {
        content,
        priority,
        userId,
      },
    });
  }

  async toggleDiscussed(id: number, userId: number): Promise<Topic> {
    const topic = await this.prisma.topic.findUnique({ where: { id } });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    if (topic.userId !== userId) {
      throw new NotFoundException(`You don't have permission to edit this topic`);
    }

    return this.prisma.topic.update({
      where: { id },
      data: { discussed: !topic.discussed },
    });
  }

  async archiveTopic(id: number, userId: number): Promise<Topic> {
    const topic = await this.prisma.topic.findUnique({ where: { id } });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    if (topic.userId !== userId) {
      throw new NotFoundException(`You don't have permission to archive this topic`);
    }

    if (!topic.discussed) {
      throw new BadRequestException(`Topic must be marked as discussed before it can be archived`);
    }

    return this.prisma.topic.update({
      where: { id },
      data: { archived: true },
    });
  }

  async findAll(includeArchived: boolean = false) {
    return this.prisma.topic.findMany({
      where: includeArchived ? {} : { archived: false },
      include: {
        user: { select: { username: true } },
        comments: {
          include: { user: { select: { username: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: [
        { discussed: 'asc' },
        { priority: 'asc' },
      ],
    });
  }

  async update(id: number, content: string, priority: number, userId: number) {
    const topic = await this.prisma.topic.findUnique({ where: { id } });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    if (topic.userId !== userId) {
      throw new NotFoundException(`You don't have permission to edit this topic`);
    }

    return this.prisma.topic.update({
      where: { id },
      data: { content, priority },
    });
  }

  async findOne(id: number) {
    const topic = await this.prisma.topic.findUnique({
      where: { id },
      include: {
        user: { select: { username: true } },
        comments: {
          include: { user: { select: { username: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }

    return topic;
  }
}