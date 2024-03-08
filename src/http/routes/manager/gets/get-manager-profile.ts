import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";

export const getManagerProfile = new Elysia().get(
  "/profile",
  async () => {
    return await db.manager.findFirstOrThrow({
      where: {
        id: (await hackId()).managerId,
      },
      select: {
        id: true,
        name: true,
        avatar:true,
        email: true,
        role: true,
        createdAt: true,
        tel: true,
      },
    });
  },
);
