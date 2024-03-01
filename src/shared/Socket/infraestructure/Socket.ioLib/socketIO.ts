import { Socket, io } from "socket.io-client";
import { Order } from "../../../../Order/domain/entities/order";
import { SocketRepository } from "../../domain/repository/socket-repositor";
import { Event } from "../../domain/entities/event";
import { config } from "../../domain/entities/config";

export class SocketIO implements SocketRepository {
    constructor() {}
    async connect() {
      return new Promise<Socket>((resolve, reject) => {
        try {
          const socket = io(config.SocketIO.url);
          console.log(socket);
          resolve(socket);
        } catch (err: any) {
          reject(err);
        }
      });
    }
    async sendData(order: Order) {
      try {
        const socket = await this.connect();
        console.log("Order enviada:" + order);
        socket.emit(Event.SEND_DATA, order);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }