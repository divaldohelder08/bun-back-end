import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { authentication } from "./authentication";
import { getAllReceiptInPeriod } from "./get-all-in-period-recolhas";
import { getDailyReceiptInPeriod } from "./get-daily-receipt-in-period";
import { getDayRecolhasAmount } from "./get-day-recolhas-amount";
import { getMonthCanceledRecolhasAmount } from "./get-month-canceled-recolhas-amount";
import { getMonthRecolhasAmount } from "./get-month-recolhas-amount";
import { getProfile } from "./get-profile";

export const indexManager = new Elysia()
  .use(authentication) //sub root
  .use(authenticate) // /manager/authenticate => Post
  .use(getProfile) // /manager/me => get
  .use(authenticateFromLink) // /manager/auth-links/authenticate => get
  .use(getAllReceiptInPeriod) // /manager/all-receipt-in-period
  .group("/metrics", (app) => {
    return app
      .use(getMonthCanceledRecolhasAmount) // /manager/metrics/month-canceled-recolhas-amount => get
      .use(getDayRecolhasAmount) // /manager/metrics/day-recolhas-amount => get
      .use(getDailyReceiptInPeriod) // /manager/metrics/daily-receipt-in-period => get
      .use(getMonthRecolhasAmount); // /manager/metrics/month-recolhas-amount => get
  });
