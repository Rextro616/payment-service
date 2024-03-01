import { Order } from "../../../../Order/domain/entities/order";
import { config } from "../../domain/entities/config";
import { BrokerRepository } from "../../domain/repository/broker-repository";
import amqp, { Connection, Channel } from "amqplib/callback_api";

export class AMQPLibRepository implements BrokerRepository {
  connectionBroker(): Promise<any> {
    return new Promise<Connection>((resolveConnection, rejectConnection) => {
      amqp.connect(config.rabbitMQ.url, (err: any, done: Connection) => {
        if (err) rejectConnection(err);
        resolveConnection(done);
      });
    });
  }
  async createChannel(): Promise<any> {
    try {
      const connection = await this.connectionBroker();
      return new Promise<Channel>((resolveChanel, rejectChannel) => {
        connection.createChannel((err: any, channel: Channel) => {
          if (err) rejectChannel(err);
          resolveChanel(channel);
        });
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async sendMessageToQueue(order : Order): Promise<void> {
    try {
        const channel = await this.createChannel();
        await channel.assertQueue(config.rabbitMQ.queueName, {
          durable: false,
        });
        channel.sendToQueue(config.rabbitMQ.queueName, Buffer.from(JSON.stringify(order)));
        console.log('Sending message to queue": ' + order);
        return Promise.resolve();
    } catch (error : any) {
      throw new Error(error);
    }
  }

  async consumeMessage(): Promise<any> {
    try {
      const channel = await this.createChannel();
      await channel.assertQueue(config.rabbitMQ.queueNameConsume, {
        durable: false,
      });
      return new Promise<Order>((resolveConsume, rejectConsume) => {
        channel.consume(config.rabbitMQ.queueNameConsume, async (message: amqp.Message | null) => {
          if (message !== null) {
            const data = JSON.parse(message?.content.toString());
            await channel.ack(message);
            console.log('Consuming message from queue": ' + data);
            resolveConsume(data.body);
          }
          rejectConsume(message);
        });
      });
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
