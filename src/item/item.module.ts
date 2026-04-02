import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { TipoItem } from 'src/tipo-item/entities/tipo-item.entity';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, TipoUnidade, Fornecedor, TipoItem]),
    GatewayModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
