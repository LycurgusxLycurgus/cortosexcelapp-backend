import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
}