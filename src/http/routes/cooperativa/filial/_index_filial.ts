import Elysia from "elysia";
import { getClients } from "./clients";
import { getDrivers } from "./drivers";
import { getManagerProfile } from "./get-manager-profile";
import { getOverView } from "./get-over-view";
import { getRecolhas } from "./recolhas";

export const indexFilial = new Elysia()
  .use(getRecolhas)
  .use(getDrivers)
  .use(getClients)
  .use(getOverView)
  .use(getManagerProfile);
