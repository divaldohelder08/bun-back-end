import Elysia from "elysia";
import { getClients } from "./clients";
import { getDrivers } from "./drivers";
import { getRecolhas } from "./recolhas";

export const indexFilial = new Elysia()
  .use(getRecolhas)
  .use(getDrivers)
  .use(getClients);
