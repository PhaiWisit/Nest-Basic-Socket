import { OnModuleInit } from "@nestjs/common";
import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway()
export class MyGateway implements OnModuleInit {
    socketId;

    @WebSocketServer()
    server: Server;



    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('Connected');
            this.socketId = socket.id;
        });

    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any) {
        console.log(body);
        this.server.emit("onMessage", {
            user: this.socketId,
            content: body,
        })

    }
}