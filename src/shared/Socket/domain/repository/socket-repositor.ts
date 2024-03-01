import { Order } from "../../../../Order/domain/entities/order";

export interface SocketRepository {
  connect(): Promise<any>;
  sendData(order: Order): Promise<void>;
}