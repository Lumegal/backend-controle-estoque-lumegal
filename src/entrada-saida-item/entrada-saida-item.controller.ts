import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EntradaSaidaItemService } from './entrada-saida-item.service';
import { CreateEntradaSaidaItemDto } from './dto/create-entrada-saida-item.dto';
import { UpdateEntradaSaidaItemDto } from './dto/update-entrada-saida-item.dto';

@Controller('entrada-saida-item')
export class EntradaSaidaItemController {
  constructor(
    private readonly entradaSaidaItemService: EntradaSaidaItemService,
  ) {}

  @Post()
  create(@Body() createEntradaSaidaItemDto: CreateEntradaSaidaItemDto[]) {
    return this.entradaSaidaItemService.create(createEntradaSaidaItemDto);
  }

  @Get()
  findAll() {
    return this.entradaSaidaItemService.findAll();
  }

  @Get(':dataInicial/:dataFinal')
  findRelatorio(
    @Param('dataInicial') dataInicial: string,
    @Param('dataFinal') dataFinal: string,
  ) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    return this.entradaSaidaItemService.findRelatorio(inicio, fim);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entradaSaidaItemService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEntradaSaidaEpiDto: UpdateEntradaSaidaItemDto,
  ) {
    return this.entradaSaidaItemService.update(+id, updateEntradaSaidaEpiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entradaSaidaItemService.remove(+id);
  }
}
