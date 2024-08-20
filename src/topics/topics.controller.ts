import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicsService } from './topics.service';

@Controller('topics')
@UseGuards(AuthGuard('jwt'))
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Post()
  async create(@Body('content') content: string, @Request() req) {
    return this.topicsService.create(content, req.user.userId);
  }

  @Get()
  async findAll() {
    return this.topicsService.findAll();
  }
}