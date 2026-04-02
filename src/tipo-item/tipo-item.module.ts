import { Module } from '@nestjs/common';
import { TipoItemService } from './tipo-item.service';
import { TipoItemController } from './tipo-item.controller';
import { TipoItem } from './entities/tipo-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoItem]), GatewayModule],
  controllers: [TipoItemController],
  providers: [TipoItemService],
})
export class TipoItemModule {}
