import { db } from "@/db/connection";
import Elysia from "elysia";

export const getSuperManagers = new Elysia().get(
  "/get-superManagers",
  async () => {
    return await db.manager.findMany({
      where: {
        role: "superGerente",
      },
      select: {
        name: true,
        email: true,
      },
    });
  },
);
