import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CreateTopicDto, UpdateTopicDto } from '../../topics/dto/topic.dto';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    if (req.path.startsWith('/topics') && !req.path.includes('comments')) {
      const dtoClass = req.method === 'POST' ? CreateTopicDto : UpdateTopicDto;
      const dtoObject = plainToClass(dtoClass, req.body);
      const errors = await validate(dtoObject);

      if (errors.length > 0) {
        const errorMessages = errors.map(error => Object.values(error.constraints)).flat();
        throw new BadRequestException(errorMessages);
      }
    }

    next();
  }
}