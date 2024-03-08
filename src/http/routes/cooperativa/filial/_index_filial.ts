import Elysia from "elysia";
import { getClients } from "./clients";
import { getDrivers } from "./drivers";
import { getRecolhas } from "./recolhas";
import { getOverView } from "./get-over-view";
import { getManagerProfile } from "./get-manager-profile";

export const indexFilial = new Elysia()
  .use(getRecolhas)
  .use(getDrivers)
  .use(getClients)
  .use(getOverView)
  .use(getManagerProfile);
