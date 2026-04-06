import { Item } from 'src/item/entities/item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class EntradaSaidaItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.entradasSaidasItem, {
    eager: true,
  })
  @JoinColumn()
  item: Item;

  @Column()
  quantidade: number;

  @Column()
  data: Date;
}
