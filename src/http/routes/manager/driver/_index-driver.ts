import Elysia from "elysia";
import { createDriver } from "./create-driver";
import { updateDriverStatus } from "./driver-update-status";

export const indexDriver = new Elysia()
  .use(updateDriverStatus)
  .use(createDriver);
