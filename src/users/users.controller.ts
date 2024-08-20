import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsStrongPassword } from '../common/decorators/is-strong-password.decorator';

class CreateUserDto {
  username: string;

  @IsStrongPassword()
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto.username, createUserDto.password);
  }
}