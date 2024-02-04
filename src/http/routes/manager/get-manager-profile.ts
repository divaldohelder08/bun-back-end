import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";

export const getManagerProfile = new Elysia().get(
  "/get-manager-profile",
  async () => {
    return await db.manager.findFirstOrThrow({
      where: {
        id: (await hackId()).managerId,
      },
      select: {
      id:true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        tel:true,
        Filial: {
          select: {
            status: true,
          },
        },
      },
    });
  }
);
