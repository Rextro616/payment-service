
import { PayOrder } from "../application/services/pay-order.service";
import { PayOrderController } from "./controllers/pay-order-controller.controller";
import { AMQPLibRepository } from "../../shared/Broker/infraestructure/AMQPLibRepository/amqp-repository";
import { SendMessageToQueueService } from "../../shared/Broker/application/service/send-message-to-queue.service";
import { SendConfirmationToClient } from "../../shared/Socket/application/service/send-confirmation-to-user.service";
import { SocketIO } from "../../shared/Socket/infraestructure/Socket.ioLib/socketIO";

export

const amqpLibRepository = new AMQPLibRepository();
const socketRepository = new SocketIO();

const sendMessageToQueueService = new SendMessageToQueueService(amqpLibRepository);
const sendConfirmationToClient = new SendConfirmationToClient(socketRepository);

const payOrder = new PayOrder(sendMessageToQueueService, sendConfirmationToClient);

export const payOrderController = new PayOrderController(
  payOrder
);

