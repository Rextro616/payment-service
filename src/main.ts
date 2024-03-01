import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();
import express from "express";

import { config } from "./shared/config";
import indexRouter from "./shared/index-router";

function main() {

  const app = express();
  app.disable("x-powered-by");

  app.use(express.json());

  const { port } = config.server;

  app.use("/", indexRouter);

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

main();