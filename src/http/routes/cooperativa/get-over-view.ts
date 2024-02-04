import { db } from "@/db/connection";
import Elysia from "elysia";

export const getOverView = new Elysia().get("/get-over-view", async () => {
  return {
    clients: await db.cliente.count(),
    drivers: await db.driver.count(),
    recolhas: await db.recolha.count(),
    filias: await db.filial.count(),
  };
});
