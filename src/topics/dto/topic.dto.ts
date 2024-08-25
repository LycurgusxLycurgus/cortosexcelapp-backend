import { IsString, IsNotEmpty, MaxLength, IsInt, Min, Max, IsBoolean, IsOptional } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @IsInt()
  @Min(1)
  @Max(2)
  priority: number;

  @IsBoolean()
  @IsOptional()
  discussed?: boolean;

  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}

export class UpdateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @IsInt()
  @Min(1)
  @Max(2)
  priority: number;

  @IsBoolean()
  @IsOptional()
  discussed?: boolean;

  @IsBoolean()
  @IsOptional()
  archived?: boolean;
}