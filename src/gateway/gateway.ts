import {
  WebSocketGateway,
  OnGatewayConnection,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Fornecedor } from 'src/fornecedor/entities/fornecedor.entity';
import { Item } from 'src/item/entities/item.entity';
import { TipoItem } from 'src/tipo-item/entities/tipo-item.entity';
import { TipoUnidade } from 'src/tipo-unidade/entities/tipo-unidade.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateway implements OnGatewayConnection {
  handleConnection(@ConnectedSocket() client: Socket) {
    console.log('Cliente conectado:', client.id);
    console.log(client.handshake.address);
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }

  @WebSocketServer()
  server: Server;

  emitirItemAtualizado(itens?: Item[] | Item) {
    this.server.emit('itemAtualizado', itens);
  }

  emitirRegistroAtualizado(registro?: TipoItem | TipoUnidade | Fornecedor) {
    this.server.emit('registroAtualizado', registro);
  }
}
