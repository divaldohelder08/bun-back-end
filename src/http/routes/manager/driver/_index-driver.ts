import Elysia from "elysia";
import { create } from "./create";
import { deleteDriver } from "./delete";
import { updateStatus } from "./update-status";

export const indexDriver = new Elysia()
  .use(updateStatus)
  .use(create)
  .use(deleteDriver);
