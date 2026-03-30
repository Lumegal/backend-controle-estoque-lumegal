import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoItemDto } from './create-tipo-item.dto';

export class UpdateTipoItemDto extends PartialType(CreateTipoItemDto) {}
