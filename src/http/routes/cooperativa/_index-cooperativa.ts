import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllFilial } from "./get-all-filial";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getDriverById } from "./get-driver-by-id";
import { indexMetrics } from "./metrics/_index-metrics";

export const indexCooperativa = new Elysia()
  .use(authenticate)
  .use(authenticateFromLink)
  .use(getAllReceiptInPeriod) // /cooperativa/all-receipt-in-period
  .use(getAllDrivers) // /cooperativa/get-all-drivers => get
  .use(getAllClients) // /cooperativa/get-all-clients => get
  .use(deleteClient)
  .use(getAllFilial) // /cooperativa/get-all-filial
  .use(getDriverById) // /cooperativa/get-driver-by-id

  .group("/metrics", (app) => app.use(indexMetrics));
