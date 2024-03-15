import { db } from "@/db/connection";
import { isNotEmpty } from "node_modules/elysia/dist/cjs/handler";

import Elysia from "elysia";

export const getManagers = new Elysia().get("/managers", async () => {
  const count = await db.manager.count();
  const man = await db.manager.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      role: true,
      filial: {
        select: {
          name: true,
        },
      },
    },
  });
  return man.map((e) => {
    if (isNotEmpty(e.filial))
      return {
        id: e.id,
        name: e.name,
        email: e.email,
        avatar: e.avatar,
        role: e.role,
        filial: e.filial[0].name,
      };

    return {
      id: e.id,
      name: e.name,
      email: e.email,
      role: e.role,
      filial: null,
      avatar: e.avatar,
    };
  });
});
