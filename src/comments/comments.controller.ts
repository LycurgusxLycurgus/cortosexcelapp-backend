import { Controller, Post, Body, Param, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('topics/:topicId/comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post()
  async create(@Param('topicId') topicId: string, @Body() createCommentDto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(createCommentDto.content, +topicId, req.user.userId);
  }

  @Get()
  async findByTopicId(@Param('topicId') topicId: string) {
    return this.commentsService.findByTopicId(+topicId);
  }
}