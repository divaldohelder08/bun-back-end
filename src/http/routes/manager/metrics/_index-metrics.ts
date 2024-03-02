import Elysia from "elysia";
import { bigChart } from "./big-chart";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getMonthCanceledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";
import { getPopularDrivers } from "./get-popular-drivers";
import { getPaymentAmount } from "./payment-amount";

export const indexMetrics = new Elysia()
  .use(getPopularDrivers)
  .use(getMonthCanceledRecolhasAmount) // /manager/metrics/month-canceled-recolhas-amount => get
  .use(getDayRecolhasAmount) // /manager/metrics/day-recolhas-amount => get
  .use(bigChart) // /manager/metrics/big-chart => get
  .use(getPaymentAmount) // /manager/metrics//month-payment-amount => get
  .use(getMonthRecolhasAmount); // /manager/metrics/month-recolhas-amount => get
