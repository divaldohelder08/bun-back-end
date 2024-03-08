import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { deleteClient } from "./delete-client";
import { indexFilial } from "./filial/_index_filial";
import { indexGeoMap } from "./geo-map/_index-geo-map";
import { getClients } from "./gets/clients";
import { getDrivers } from "./gets/drivers";
import { getFilial } from "./gets/filial";
import { getRecolhas } from "./gets/recolhas";
import { getClientById } from "./gets/client-by-id";
// import { getDeleteClientById } from "./delete/delete-client-by-id";
import { getDriverById } from "./gets/driver-by-id";
import { getOverView } from "./gets/get-over-view";
import { getSuperManagers } from "./gets/get-superManagers";
import { indexMetrics } from "./metrics/_index-metrics";
import { updateFilialStatus } from "./update-filial-status";
import { getManagers } from "./gets/managers";

export const indexCooperativa = new Elysia()
  .use(authenticate)
  .use(getRecolhas) // /cooperativa/recolhas
  .use(getDrivers) // /cooperativa/drivers => get
  .use(getClients) // /cooperativa/clients => get
  .use(getManagers) // /cooperativa/managers => get
  .use(deleteClient)
  .use(getFilial) // /cooperativa/filial
  .use(getDriverById) // /cooperativa/get-driver-by-id
  .use(getClientById) // /cooperativa/get-client-by-id
  // .use(getDeleteClientById)

  .use(getOverView)
  .use(getSuperManagers)
  .use(updateFilialStatus)
  .group("/metrics", (app) => app.use(indexMetrics))
  .group("/geo-map", (app) => app.use(indexGeoMap))
  .group("/filial", (app) => app.use(indexFilial));
