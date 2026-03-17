import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { EpiModule } from './epi/epi.module';
import { TipoUnidadeModule } from './tipo-unidade/tipo-unidade.module';
import { FornecedorModule } from './fornecedor/fornecedor.module';
import { CategoriaFornecedorModule } from './categoria-fornecedor/categoria-fornecedor.module';
import { EnderecoModule } from './endereco/endereco.module';
import { SuprimentoModule } from './suprimento/suprimento.module';
import { EntradaSaidaSuprimentoModule } from './entrada-saida-suprimento/entrada-saida-suprimento.module';
import { EntradaSaidaEpiModule } from './entrada-saida-epi/entrada-saida-epi.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Carrega as variáveis do .env automaticamente
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        // Não use synchronize: true em produção
        synchronize: true,
      }),
    }),
    UsuarioModule,
    EpiModule,
    EntradaSaidaEpiModule,
    TipoUnidadeModule,
    FornecedorModule,
    CategoriaFornecedorModule,
    EnderecoModule,
    SuprimentoModule,
    EntradaSaidaSuprimentoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
