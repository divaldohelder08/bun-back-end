import Elysia from "elysia";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getMonthCanceledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";

export const indexMetrics = new Elysia()
  .use(getMonthCanceledRecolhasAmount) // /manager/metrics/month-canceled-recolhas-amount => get
  .use(getDayRecolhasAmount) // /manager/metrics/day-recolhas-amount => get
  .use(getMonthRecolhasAmount); // /manager/metrics/month-recolhas-amount => get
