import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { ValidationMiddleware } from '../common/middleware/validation.middleware';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';

@Module({
  providers: [TopicsService, PrismaService],
  controllers: [TopicsController],
  exports: [TopicsService],
})
export class TopicsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes('topics');
  }
}