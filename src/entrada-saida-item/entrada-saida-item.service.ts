import { Injectable } from '@nestjs/common';
import { EntradaSaidaItem } from './entities/entrada-saida-epi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
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
      item: { id: item.idItem },
    }));

    const salvos = await this.entradaSaidaItemRepository.save(dadosComData);
    return salvos;
  }

  findAll() {
    return `This action returns all entradaSaida`;
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
    return `This action returns a #${id} entradaSaida`;
  }

  update(id: number, updateEntradaSaidaItemDto: UpdateEntradaSaidaItemDto) {
    return `This action updates a #${id} entradaSaida`;
  }

  remove(id: number) {
    return `This action removes a #${id} entradaSaida`;
  }
}
