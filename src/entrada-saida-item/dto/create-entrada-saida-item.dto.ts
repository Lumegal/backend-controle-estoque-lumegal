import { IsDefined, IsNumber } from 'class-validator';

export class CreateEntradaSaidaItemDto {
  @IsNumber()
  idItem: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  data: Date;
}
