import Elysia from "elysia";
import { authenticate } from "./authenticate";
import { authenticateFromLink } from "./authenticate-from-link";
import { changePassword } from "./change-password";
import { getAllRecolha } from "./get-all-recolha";
import { getProfile } from "./get-profile";
import { validateCode } from "./validate-code";
import { validateEmail } from "./validate-email";

export const indexDriver = new Elysia()
  .use(authenticate) // /driver/authenticate => Post
  .use(getProfile) // /driver/me => get
  .use(authenticateFromLink) // /driver/auth-links/authenticate => get
  .use(validateEmail) //  /driver/validate-email => put
  .use(validateCode) // /driver/validate-code/:id => post
  .use(changePassword) // /driver/change-password => post
  .use(getAllRecolha); ///driver/get-all-recolha/id get just to test
