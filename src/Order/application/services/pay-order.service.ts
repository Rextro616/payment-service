import { SendMessageToQueueService } from "../../../shared/Broker/application/service/send-message-to-queue.service";
import { SendConfirmationToClient } from "../../../shared/Socket/application/service/send-confirmation-to-user.service";
import { Order } from "../../domain/entities/order";

export class PayOrder {
  constructor(
    private readonly sendMessageToQueueService: SendMessageToQueueService,
    private readonly sendConfirmationToClient: SendConfirmationToClient
  ) {}
  async run(newOrder: Order): Promise<Order> {
    try {
      console.log(newOrder.name);
      const paidOrder: Order = {
        name: newOrder.name,
        status: "completed",
        amount: newOrder.amount,
      };
      await this.sendMessageToQueueService.run(paidOrder);
      await this.sendConfirmationToClient.run(paidOrder);
      return paidOrder;
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }
}
