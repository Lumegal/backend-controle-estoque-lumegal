import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TipoItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tipo: string;

  @OneToMany(() => Item, (item) => item.tipoItem, {
    nullable: false, // obrigatório
  })
  item: Item[];
}
