import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';

@Module({
  providers: [TopicsService, PrismaService],
  controllers: [TopicsController],
  exports: [TopicsService],
})
export class TopicsModule {}