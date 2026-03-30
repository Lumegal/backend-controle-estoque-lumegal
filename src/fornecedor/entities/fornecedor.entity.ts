import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CategoriaFornecedor } from 'src/categoria-fornecedor/entities/categoria-fornecedor.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Item } from 'src/item/entities/item.entity';

@Entity()
export class Fornecedor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @ManyToMany(() => Endereco, (endereco) => endereco.fornecedores)
  @JoinTable()
  enderecos: Endereco[];

  @ManyToMany(() => Item, (item) => item.fornecedores)
  itens: Item[];

  @ManyToMany(() => CategoriaFornecedor, (categoria) => categoria.fornecedores, {
    eager: true, // carrega automaticamente as categorias
  })
  @JoinTable() // <- lado dono da relação
  categoriasFornecedor: CategoriaFornecedor[];
}
