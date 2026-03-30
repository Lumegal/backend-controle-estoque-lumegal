import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Tipo é obrigatório' })
  tipo: string;
}
