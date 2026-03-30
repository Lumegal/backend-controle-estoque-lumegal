import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Item } from './entities/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UpdateQuantidadeItemDto } from './dto/update-quantidade-item.dto';

import { TipoUnidade } from '../tipo-unidade/entities/tipo-unidade.entity';
import { Fornecedor } from '../fornecedor/entities/fornecedor.entity';
import { TipoItem } from 'src/tipo-item/entities/tipo-item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,

    @InjectRepository(TipoUnidade)
    private tipoUnidadeRepository: Repository<TipoUnidade>,

    @InjectRepository(TipoItem)
    private tipoItemRepository: Repository<TipoItem>,

    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
      id: createItemDto.tipoUnidadeId,
    });

    if (!tipoUnidade) {
      throw new NotFoundException('Tipo de unidade não encontrado');
    }

    const tipoItem = await this.tipoItemRepository.findOneBy({
      id: createItemDto.tipoItemId,
    });

    if (!tipoItem) {
      throw new NotFoundException('Tipo do item não encontrado');
    }

    // Verificar duplicidade de nome
    const itemComMesmoNome = await this.itemRepository.findOne({
      where: { nome: createItemDto.nome },
    });

    if (itemComMesmoNome) {
      throw new ConflictException('Já existe um item com esse nome.');
    }

    const fornecedores = createItemDto.fornecedores?.length
      ? await this.fornecedorRepository.findBy({ id: In(createItemDto.fornecedores) })
      : [];

    const novoItem = this.itemRepository.create({
      nome: createItemDto.nome,
      descricao: createItemDto.descricao,
      certificadoAprovacao: createItemDto.certificadoAprovacao,
      quantidade: createItemDto.quantidade,
      quantidadeParaAviso: createItemDto.quantidadeParaAviso,
      tipoItem,
      tipoUnidade,
      fornecedores,
      preco: createItemDto.preco,
      ipi: createItemDto.ipi,
    });

    const salvo = await this.itemRepository.save(novoItem);
    return salvo;
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({
      relations: ['tipoUnidade', 'fornecedores'],
    });
  }

  async findAllEmFalta(): Promise<Item[]> {
    return await this.itemRepository
      .createQueryBuilder('epi')
      .leftJoinAndSelect('epi.tipoUnidade', 'tipoUnidade')
      .where('epi.quantidade < epi.quantidadeParaAviso')
      .getMany();
  }

  async findOne(id: number): Promise<Item> {
    const epi = await this.itemRepository.findOne({
      where: { id },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!epi) {
      throw new NotFoundException('EPI não encontrado');
    }

    return epi;
  }

  async findOnePorNome(nome: string): Promise<Item> {
    const epi = await this.itemRepository.findOne({
      where: { nome },
      relations: ['tipoUnidade', 'fornecedores'],
    });

    if (!epi) {
      throw new NotFoundException('EPI não encontrado');
    }

    return epi;
  }

  async update(nomeParaEditarEpi: string, dto: UpdateItemDto): Promise<Item> {
    const epi = await this.findOnePorNome(nomeParaEditarEpi);
    Object.assign(epi, dto);
    if (dto.nome) epi.nome = dto.nome;
    if (dto.descricao) epi.descricao = dto.descricao;
    if (dto.certificadoAprovacao)
      epi.certificadoAprovacao = dto.certificadoAprovacao;
    if (dto.quantidade !== undefined) epi.quantidade = dto.quantidade;
    if (dto.quantidadeParaAviso !== undefined)
      epi.quantidadeParaAviso = dto.quantidadeParaAviso;
    if (dto.preco !== undefined) epi.preco = dto.preco;
    if (dto.ipi !== undefined) epi.ipi = dto.ipi;
    if (dto.tipoUnidadeId) {
      const tipoUnidade = await this.tipoUnidadeRepository.findOneBy({
        id: dto.tipoUnidadeId,
      });
      if (!tipoUnidade) {
        throw new NotFoundException('Tipo de unidade não encontrado');
      }
      epi.tipoUnidade = tipoUnidade;
    }

    if (dto.fornecedores) {
      const fornecedores = await this.fornecedorRepository.findBy({
        id: In(dto.fornecedores),
      });
      epi.fornecedores = fornecedores;
    }

    return this.itemRepository.save(epi);
  }

  async entradaSaidaItem(
    movimentacoes: UpdateQuantidadeItemDto[],
  ): Promise<Item[]> {
    const resultados: Item[] = [];

    for (const mov of movimentacoes) {
      const epi = await this.itemRepository.findOneBy({
        id: mov.id,
      });

      if (!epi) continue;

      epi.quantidade += mov.quantidade;
      const salvo = await this.itemRepository.save(epi);
      resultados.push(salvo);
    }

    return resultados;
  }

  async remove(id: number) {
    await this.itemRepository.delete({ id });
    return { mensagem: 'Item excluído com sucesso.' };
  }
}
