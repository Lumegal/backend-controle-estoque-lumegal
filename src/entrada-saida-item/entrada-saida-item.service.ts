import { Injectable } from '@nestjs/common';
import { EntradaSaidaItem } from './entities/entrada-saida-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { CreateEntradaSaidaItemDto } from './dto/create-entrada-saida-item.dto';
import { UpdateEntradaSaidaItemDto } from './dto/update-entrada-saida-item.dto';

@Injectable()
export class EntradaSaidaItemService {
  constructor(
    @InjectRepository(EntradaSaidaItem)
    private entradaSaidaItemRepository: Repository<EntradaSaidaItem>,
  ) {}

  async create(createEntradaSaidaItemDto: CreateEntradaSaidaItemDto[]) {
    const horario = new Date();
    const dadosComData = createEntradaSaidaItemDto.map((item) => ({
      ...item,
      data: horario, // sobrescreve ou define a data
      itemId: { id: item.itemId },
    }));

    const salvos = await this.entradaSaidaItemRepository.save(dadosComData);

    return this.entradaSaidaItemRepository.find({
      where: {
        id: In(salvos.map((s) => s.id)),
      },
      relations: ['itemId'],
    });
  }

  findAll() {
    return this.entradaSaidaItemRepository.find({ relations: ['itemId'] });
  }

  async findRelatorio(
    dataInicial: Date,
    dataFinal: Date,
  ): Promise<EntradaSaidaItem[]> {
    return await this.entradaSaidaItemRepository.find({
      where: {
        data: Between(dataInicial, dataFinal),
      },
      relations: ['item'], // Inclui o item relacionado (se quiser no resultado)
      order: {
        data: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.entradaSaidaItemRepository.find({
      where: { id },
      relations: ['itemId'],
    });
  }

  update(id: number, updateEntradaSaidaItemDto: UpdateEntradaSaidaItemDto) {
    return `This action updates a #${id} entradaSaida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradaSaida`;
  }
}
