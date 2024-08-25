import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TopicsService } from './topics.service';
import { CreateTopicDto, UpdateTopicDto } from './dto/topic.dto';

@Controller('topics')
@UseGuards(AuthGuard('jwt'))
export class TopicsController {
  constructor(private topicsService: TopicsService) {}

  @Post()
  async create(@Body() createTopicDto: CreateTopicDto, @Request() req) {
    return this.topicsService.create(createTopicDto.content, createTopicDto.priority, req.user.userId);
  }

  @Get()
  async findAll(@Query('includeArchived') includeArchived: string) {
    const includeArchivedBool = includeArchived === 'true';
    return this.topicsService.findAll(includeArchivedBool);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto, @Request() req) {
    return this.topicsService.update(+id, updateTopicDto.content, updateTopicDto.priority, req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.topicsService.findOne(+id);
  }

  @Put(':id/discussed')
  async toggleDiscussed(@Param('id') id: string, @Request() req) {
    return this.topicsService.toggleDiscussed(+id, req.user.userId);
  }

  @Put(':id/archive')
  async archiveTopic(@Param('id') id: string, @Request() req) {
    return this.topicsService.archiveTopic(+id, req.user.userId);
  }
}