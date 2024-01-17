import Elysia from "elysia";
import { authentication } from "./manager/authentication";

export const signOut = new Elysia()
  .use(authentication)
  .post("/sign-out", async ({ removeCookie }) => {
    removeCookie("auth");
  });
