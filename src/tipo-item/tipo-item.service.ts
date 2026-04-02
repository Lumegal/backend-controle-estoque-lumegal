import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoItemDto } from './dto/create-tipo-item.dto';
import { UpdateTipoItemDto } from './dto/update-tipo-item.dto';
import { TipoItem } from './entities/tipo-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MyGateway } from 'src/gateway/gateway';

@Injectable()
export class TipoItemService {
  constructor(
    @InjectRepository(TipoItem)
    private tipoItemRepository: Repository<TipoItem>,

    private readonly gateway: MyGateway,
  ) {}
  async create(createTipoItemDto: CreateTipoItemDto) {
    const tipoItem = this.tipoItemRepository.create(createTipoItemDto);
    const tipoItemSalvo = await this.tipoItemRepository.save(tipoItem)
    this.gateway.emitirRegistroAtualizado(tipoItemSalvo);
    return tipoItemSalvo;
  }

  async findAll(): Promise<TipoItem[]> {
    return this.tipoItemRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoItem`;
  }

  async findOnePorTipo(tipo: string): Promise<TipoItem> {
    const tipoEncontrado = await this.tipoItemRepository.findOneBy({ tipo });

    if (!tipoEncontrado) {
      throw new NotFoundException('Tipo do item não encontrado');
    }

    return tipoEncontrado;
  }

  update(id: number, updateTipoItemDto: UpdateTipoItemDto) {
    return `This action updates a #${id} tipoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoItem`;
  }
}
