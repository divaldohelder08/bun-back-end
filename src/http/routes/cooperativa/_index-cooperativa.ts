import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { deleteClient } from "./delete-client";
import { getAllClients } from "./get-all-clients";
import { getAllDrivers } from "./get-all-drivers";
import { getAllFilial } from "./get-all-filial";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getDailyReceiptInPeriod } from "./get-daily-receipt-in-period";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getDriverById } from "./get-driver-by-id";
import { getMonthCanceledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";

export const indexCooperativa = new Elysia()
  .use(authenticate) // /cooperativa/authenticate => Post
  .use(authenticateFromLink) // /cooperativa/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /cooperativa/all-receipt-in-period
  .use(getAllDrivers) // /cooperativa/get-all-drivers => get
  .use(getAllClients) // /cooperativa/get-all-clients => get
  .use(deleteClient)
  .use(getAllFilial) // /cooperativa/get-all-filial
  .use(getDriverById) // /cooperativa/get-driver-by-id

  .group("/metrics", (app) => {
    return app
      .use(getMonthCanceledRecolhasAmount) // /cooperativa/metrics/month-canceled-recolhas-amount => get
      .use(getDayRecolhasAmount) // /cooperativa/metrics/day-recolhas-amount => get
      .use(getDailyReceiptInPeriod) // /cooperativa/metrics/daily-receipt-in-period => get
      .use(getMonthRecolhasAmount); // /cooperativa/metrics/month-recolhas-amount => get
  });
