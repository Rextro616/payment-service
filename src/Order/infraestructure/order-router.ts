import express from "express";
import { payOrderController } from "./dependencies";

const orderRouter = express.Router();

orderRouter
  .post("/", payOrderController.run.bind(payOrderController));
export { orderRouter };