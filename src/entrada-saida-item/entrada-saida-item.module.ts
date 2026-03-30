import { Module } from '@nestjs/common';
import { EntradaSaidaItemService } from './entrada-saida-item.service';
import { EntradaSaidaItemController } from './entrada-saida-item.controller';
import { EntradaSaidaItem } from './entities/entrada-saida-epi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EntradaSaidaItem])],
  controllers: [EntradaSaidaItemController],
  providers: [EntradaSaidaItemService],
})
export class EntradaSaidaItemModule {}
