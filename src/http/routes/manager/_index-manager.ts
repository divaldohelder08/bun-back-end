import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { indexDriver } from "./driver/_index-driver";
import { indexGeoMap } from "./geo-map/_index-geo-map";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getManagerProfile } from "./get-manager-profile";
import { getOverView } from "./get-over-view";
import { indexMetrics } from "./metrics/_index-metrics";
import { indexRegister } from "./register/_index-register";
import { indexManagerSetting } from "./settings/_index-settings";
import { updateFilialStatus } from "./update-status";

export const indexManager = new Elysia()
  .use(authenticate) // /manager/authenticate => Post
  .use(authenticateFromLink) // /manager/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /manager/all-receipt-in-period
  .use(getAllDrivers) // /manager/get-all-drivers => get
  .use(getAllClients) // /manager/get-all-clients => get
  .use(deleteClient)
  .use(getOverView)
  .use(getManagerProfile)
  .use(updateFilialStatus)
  .group("/metrics", (app) => app.use(indexMetrics))
  .group("/register", (app) => app.use(indexRegister))
  .group("/driver", (app) => app.use(indexDriver))
  .group("/settings", (app) => app.use(indexManagerSetting))
  .group("/geo-map", (app) => app.use(indexGeoMap));
