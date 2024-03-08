import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { indexClient } from "./client/_index-client";
import { indexDriver } from "./driver/_index-driver";
import { indexGeoMap } from "./geo-map/_index-geo-map";
import { getAllClients } from "./gets/clients";
import { getAllDrivers } from "./gets/drivers";
import { getAllReceiptInPeriod } from "./gets/get-all-in-period-recolhas";
import { getManagerProfile } from "./gets/get-manager-profile";
import { getOverView } from "./gets/get-over-view";
import { indexMetrics } from "./metrics/_index-metrics";
import { indexManagerSetting } from "./settings/_index-settings";
import { updateFilialStatus } from "./update-status";
import { getClientById } from "./gets/client-by-id";
import { getDriverById } from "./gets/driver-by-id";



export const indexManager = new Elysia()
  .use(authenticate) // /manager/authenticate => Post
  .use(authenticateFromLink) // /manager/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /manager/all-receipt-in-period
  .use(getAllDrivers) // /manager/drivers => get
  .use(getAllClients) // /manager/clients => get
  .use(getClientById) // /manager/client/:id => get
  .use(getDriverById) // /manager/driver/:id => get
  .use(getOverView)
  .use(getManagerProfile)
  .use(updateFilialStatus)
  .group("/metrics", (app) => app.use(indexMetrics))
  .group("/driver", (app) => app.use(indexDriver))
  .group("/client", (app) => app.use(indexClient))
  .group("/settings", (app) => app.use(indexManagerSetting))
  .group("/geo-map", (app) => app.use(indexGeoMap));
