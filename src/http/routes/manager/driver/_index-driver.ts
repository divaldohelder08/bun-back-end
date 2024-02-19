import Elysia from "elysia";
import { create } from "./create";
import { updateStatus } from "./update-status";
import { deleteDriver } from "./delete";

export const indexDriver = new Elysia()
  .use(updateStatus)
  .use(create)
  .use(deleteDriver);
