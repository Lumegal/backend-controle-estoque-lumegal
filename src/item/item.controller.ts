import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateQuantidadeItemDto } from './dto/update-quantidade-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get('emFalta')
  findAllEmFalta() {
    return this.itemService.findAllEmFalta();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number) {
    return this.itemService.findOne(id);
  }

  @Patch('editarDados/:nomeParaEditarItem')
  update(
    @Body() updateItemDto: UpdateItemDto,
    @Param('nomeParaEditarItem') nomeParaEditarItem: string,
  ) {
    return this.itemService.update(nomeParaEditarItem, updateItemDto);
  }

  @Patch('entradaSaida')
  entradaSaida(
    @Body()
    movimentacoes: UpdateQuantidadeItemDto[],
  ) {
    return this.itemService.entradaSaidaItem(movimentacoes);
  }

  @Delete('excluir/:id')
  async excluir(@Param('id') id: number) {
    return this.itemService.remove(id);
  }
}
