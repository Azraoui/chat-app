import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
  } from '@nestjs/websockets'

import { Server, Socket } from 'socket.io'

@WebSocketGateway({
  cors: {
    origin: '127.0.0.1:3000',
  }
})

export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  @WebSocketServer() server: Server;

  @SubscribeMessage('send_message')
  listenForMessage(@MessageBody() msgContent) {
    
    console.log(msgContent);
    this.server.sockets.emit('recieve_message', msgContent);
  }

  // OnGatewayInit
  afterInit(server: Server) {
    console.log(`server = ${server}`);
  }
  
  // OnGatewayConnection
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
    
  }
  
  // OnGatewayDisconnect
  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    
  }
}
