import Elysia from "elysia";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getMonthCancelledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";
import { getPopularFilias } from "./get-popular-filias";

export const indexMetrics = new Elysia()
  .use(getMonthCancelledRecolhasAmount) // /cooperativa/metrics/month-canceled-recolhas-amount => get
  .use(getDayRecolhasAmount) // /cooperativa/metrics/day-recolhas-amount => get
  .use(getMonthRecolhasAmount) // /cooperativa/metrics/month-recolhas-amount => get
  .use(getPopularFilias);
