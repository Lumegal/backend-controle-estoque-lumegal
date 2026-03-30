import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoItemService } from './tipo-item.service';
import { CreateTipoItemDto } from './dto/create-tipo-item.dto';
import { UpdateTipoItemDto } from './dto/update-tipo-item.dto';

@Controller('tipo-item')
export class TipoItemController {
  constructor(private readonly tipoItemService: TipoItemService) {}

  @Post()
  create(@Body() createTipoItemDto: CreateTipoItemDto) {
    return this.tipoItemService.create(createTipoItemDto);
  }

  @Get()
  findAll() {
    return this.tipoItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoItemService.findOne(+id);
  }

  @Get('tipo/:tipo')
  findOnePorTipo(@Param('tipo') tipo: string) {
    return this.tipoItemService.findOnePorTipo(tipo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoItemDto: UpdateTipoItemDto) {
    return this.tipoItemService.update(+id, updateTipoItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoItemService.remove(+id);
  }
}
