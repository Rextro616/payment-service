import { BrokerRepository } from "../../domain/repository/broker-repository";

export class ConsumeMessageFromQueueService {
  constructor(private readonly brokerRepository: BrokerRepository) {}
  async run() {
    try {
      const message = await this.brokerRepository.consumeMessage();
      return message;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
