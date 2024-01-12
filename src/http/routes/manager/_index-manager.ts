import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getDailyReceiptInPeriod } from "./get-daily-receipt-in-period";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getMonthCanceledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";

export const indexManager = new Elysia()
  .use(authenticate) // /manager/authenticate => Post
  .use(authenticateFromLink) // /manager/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /manager/all-receipt-in-period
  .use(getAllDrivers) // /manager/get-all-drivers => get
  .use(getAllClients) // /manager/get-all-clients => get
  .use(deleteClient)
  .group("/metrics", (app) => {
    return app
      .use(getMonthCanceledRecolhasAmount) // /manager/metrics/month-canceled-recolhas-amount => get
      .use(getDayRecolhasAmount) // /manager/metrics/day-recolhas-amount => get
      .use(getDailyReceiptInPeriod) // /manager/metrics/daily-receipt-in-period => get
      .use(getMonthRecolhasAmount); // /manager/metrics/month-recolhas-amount => get
  });
