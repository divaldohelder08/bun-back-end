import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { indexMetrics } from "./metrics/_index-metrics";
import { indexRegister } from "./register/_index-register";

export const indexManager = new Elysia()
  .use(authenticate) // /manager/authenticate => Post
  .use(authenticateFromLink) // /manager/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /manager/all-receipt-in-period
  .use(getAllDrivers) // /manager/get-all-drivers => get
  .use(getAllClients) // /manager/get-all-clients => get
  .use(deleteClient)
  .group("/metrics", (app) => app.use(indexMetrics))
  .group("/register", (app) => app.use(indexRegister));
