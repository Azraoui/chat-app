import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
  } from '@nestjs/websockets'

import { Server } from 'socket.io'

@WebSocketGateway()
export class ChatGateway {

  @WebSocketServer() server: Server;

  @SubscribeMessage('new_message')
  listenForMessage(@MessageBody() msgContent) {
    
    console.log(msgContent);
    this.server.sockets.emit('recieve_message', msgContent);
  }
}