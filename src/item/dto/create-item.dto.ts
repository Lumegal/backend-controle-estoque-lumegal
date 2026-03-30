import {
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsString()
  @IsOptional()
  descricao?: string;

  @IsString()
  @IsOptional()
  certificadoAprovacao?: string;

  @IsNumber()
  @IsDefined({ message: 'Quantidade é obrigatória' })
  quantidade: number;

  @IsNumber()
  @IsDefined({ message: 'Quantidade para aviso é obrigatória' })
  quantidadeParaAviso: number;

  @IsDecimal({ decimal_digits: '2', force_decimal: true })
  preco: string;

  @IsOptional()
  @IsNumber({}, { message: 'IPI deve ser um número' })
  ipi?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Tipo do item é obrigatório' })
  tipoItemId: number;

  @IsNumber()
  @IsDefined({ message: 'Tipo de unidade é obrigatório' })
  tipoUnidadeId: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  fornecedores?: number[];
}
