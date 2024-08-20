import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Add this line

@Module({
  providers: [UsersService, PrismaService],
  controllers: [UsersController], // Add this line
  exports: [UsersService],
})
export class UsersModule {}