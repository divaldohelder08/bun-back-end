import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { indexGeoMap } from "./geo-map/_index-geo-map";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllFilial } from "./get-all-filial";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getClientById } from "./get-client-by-id";
import { getDeleteClientById } from "./get-delete-client";
import { getDriverById } from "./get-driver-by-id";
import { getOverView } from "./get-over-view";
import { getSuperManagers } from "./get-superManagers";
import { indexMetrics } from "./metrics/_index-metrics";
import { updateFilialStatus } from "./update-filial-status";

export const indexCooperativa = new Elysia()
  .use(authenticate)
  .use(authenticateFromLink)
  .use(getAllReceiptInPeriod) // /cooperativa/all-receipt-in-period
  .use(getAllDrivers) // /cooperativa/get-all-drivers => get
  .use(getAllClients) // /cooperativa/get-all-clients => get
  .use(deleteClient)
  .use(getAllFilial) // /cooperativa/get-all-filial
  .use(getDriverById) // /cooperativa/get-driver-by-id
  .use(getClientById) // /cooperativa/get-client-by-id
  .use(getDeleteClientById)
  .use(getOverView)
  .use(getSuperManagers)
  .use(updateFilialStatus)
  .group("/metrics", (app) => app.use(indexMetrics))
  .group("/geo-map", (app) => app.use(indexGeoMap));
