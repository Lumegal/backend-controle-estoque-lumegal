import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Fornecedor } from './entities/fornecedor.entity';
import { CreateFornecedorDto } from './dto/create-fornecedor.dto';
import { UpdateFornecedorDto } from './dto/update-fornecedor.dto';

import { Endereco } from '../endereco/entities/endereco.entity';
import { CategoriaFornecedor } from '../categoria-fornecedor/entities/categoria-fornecedor.entity';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(Fornecedor)
    private fornecedorRepository: Repository<Fornecedor>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(CategoriaFornecedor)
    private categoriaRepository: Repository<CategoriaFornecedor>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async create(createFornecedorDto: CreateFornecedorDto): Promise<Fornecedor> {
    const enderecos = await this.enderecoRepository.findBy({
      id: In(createFornecedorDto.enderecos),
    });

    const categorias = await this.categoriaRepository.findBy({
      id: In(createFornecedorDto.categoriasFornecedor),
    });

    if (!enderecos.length) {
      throw new NotFoundException('Nenhum endereco encontrado');
    }

    if (!categorias.length) {
      throw new NotFoundException('Nenhuma categoria de fornecedor encontrada');
    }

    const itens = createFornecedorDto.itens?.length
      ? await this.itemRepository.findBy({ id: In(createFornecedorDto.itens) })
      : [];

    const fornecedor = this.fornecedorRepository.create({
      nome: createFornecedorDto.nome,
      enderecos,
      categoriasFornecedor: categorias,
      itens,
    });

    const fornecedorSalvo = await this.fornecedorRepository.save(fornecedor);

    const fornecedorCompleto = await this.fornecedorRepository.findOne({
      where: { id: fornecedorSalvo.id },
      relations: ['enderecos', 'categoriasFornecedor', 'itens'],
    });

    if (!fornecedorCompleto) {
      throw new NotFoundException('Fornecedor não encontrado após salvar');
    }

    return fornecedorCompleto;
  }

  async findAll(): Promise<Fornecedor[]> {
    return await this.fornecedorRepository.find({
      relations: ['enderecos', 'categoriasFornecedor', 'itens'],
    });
  }

  async findOne(id: number): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id },
      relations: ['enderecos', 'categoriasFornecedor', 'itens'],
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return fornecedor;
  }

  async findOnePorNome(nome: string): Promise<Fornecedor> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { nome },
      relations: ['enderecos', 'categoriasFornecedor', 'itens'],
    });

    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }

    return fornecedor;
  }

  async update(
    nomeOriginal: string,
    updateFornecedorDto: UpdateFornecedorDto,
  ): Promise<Fornecedor> {
    const fornecedor = await this.findOnePorNome(nomeOriginal);

    if (updateFornecedorDto.nome) {
      fornecedor.nome = updateFornecedorDto.nome;
    }

    if (updateFornecedorDto.enderecos) {
      const enderecos = await this.enderecoRepository.findBy({
        id: In(updateFornecedorDto.enderecos),
      });
      if (!enderecos.length) {
        throw new NotFoundException('Enderecos não encontrados');
      }
      fornecedor.enderecos = enderecos;
    }

    if (updateFornecedorDto.categoriasFornecedor) {
      const categorias = await this.categoriaRepository.findBy({
        id: In(updateFornecedorDto.categoriasFornecedor),
      });
      if (!categorias.length) {
        throw new NotFoundException('Categorias não encontradas');
      }
      fornecedor.categoriasFornecedor = categorias;
    }

    if (updateFornecedorDto.itens) {
      const itens = await this.itemRepository.findBy({
        id: In(updateFornecedorDto.itens),
      });
      fornecedor.itens = itens;
    }

    return await this.fornecedorRepository.save(fornecedor);
  }

  async remove(id: number): Promise<void> {
    const fornecedor = await this.findOne(id);
    await this.fornecedorRepository.remove(fornecedor);
  }
}
