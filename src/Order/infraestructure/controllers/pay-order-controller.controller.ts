import { Request, Response } from "express";
import { PayOrder } from "../../application/services/pay-order.service";

export class PayOrderController {
  constructor(readonly payOrder: PayOrder) {}

  async run(req: Request, res: Response) {
    try {
      const result = await this.payOrder.run();
      console.log(result);
      res.status(200).send(result);
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
