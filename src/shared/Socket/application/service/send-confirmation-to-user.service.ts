import { Order } from "../../../../Order/domain/entities/order";
import { SocketRepository } from "../../domain/repository/socket-repositor";

export class SendConfirmationToClient {
    constructor(private readonly socketRepository: SocketRepository) {}
    async run(order: Order) {
      try {
        await this.socketRepository.sendData(order);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  }