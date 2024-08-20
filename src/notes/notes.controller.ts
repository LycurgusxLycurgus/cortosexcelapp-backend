import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
//   constructor(private notesService: NotesService) {}

  @Post()
  async create(@Body('content') content: string, @Request() req) {
//     return this.notesService.create(content, req.user.userId);
  }

  @Get()
  async findAll(@Request() req) {
//     return this.notesService.findAll(req.user.userId);
  }
}