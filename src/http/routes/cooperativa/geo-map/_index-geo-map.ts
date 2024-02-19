import Elysia from "elysia";
import { getClients } from "./clients";
import { getDrivers } from "./drivers";
import { getFilias } from "./filias";

export const indexGeoMap = new Elysia()
  .use(getFilias)
  .use(getDrivers)
  .use(getClients);
