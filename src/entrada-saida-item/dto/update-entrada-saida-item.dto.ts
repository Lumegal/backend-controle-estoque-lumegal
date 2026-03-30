import { PartialType } from '@nestjs/mapped-types';
import { CreateEntradaSaidaItemDto } from './create-entrada-saida-item.dto';

export class UpdateEntradaSaidaItemDto extends PartialType(
  CreateEntradaSaidaItemDto,
) {}
