import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';

@Module({
//   providers: [NotesService, PrismaService],
  controllers: [NotesController],
//   exports: [NotesService],
})
export class NotesModule {}