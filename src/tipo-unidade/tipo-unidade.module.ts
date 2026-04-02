import { Module } from '@nestjs/common';
import { TipoUnidadeService } from './tipo-unidade.service';
import { TipoUnidadeController } from './tipo-unidade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoUnidade } from './entities/tipo-unidade.entity';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [TypeOrmModule.forFeature([TipoUnidade]), GatewayModule],
  controllers: [TipoUnidadeController],
  providers: [TipoUnidadeService],
})
export class TipoUnidadeModule {}
