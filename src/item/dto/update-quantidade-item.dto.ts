import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateQuantidadeItemDto extends PartialType(CreateItemDto) {
  @IsNumber()
  id: number;
  
  @IsNumber()
  quantidade: number;
}
