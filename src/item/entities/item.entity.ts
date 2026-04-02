import { EntradaSaidaItem } from 'src/entrada-saida-item/entities/entrada-saida-item.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { TipoItem } from 'src/tipo-item/entities/tipo-item.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  certificadoAprovacao: string;

  @Column()
  quantidade: number;

  @Column()
  quantidadeParaAviso: number;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: string;

  @Column('decimal', { nullable: true })
  ipi: number;

  @ManyToOne(() => TipoItem, (tipoItem) => tipoItem.item, {
    eager: true, // opcional: traz o tipoUnidade junto no find
    nullable: false, // obrigatório
  })
  tipoItem: TipoItem;

  @ManyToOne(() => TipoUnidade, (tipoUnidade) => tipoUnidade.item, {
    eager: true, // opcional: traz o tipoUnidade junto no find
    nullable: false, // obrigatório
  })
  tipoUnidade: TipoUnidade;

  @ManyToMany(() => Fornecedor, (fornecedor) => fornecedor.itens)
  @JoinTable()
  fornecedores: Fornecedor[];

  @OneToMany(
    () => EntradaSaidaItem,
    (entradaSaidaItem) => entradaSaidaItem.itemId,
  )
  entradasSaidasItem: EntradaSaidaItem[];
}
