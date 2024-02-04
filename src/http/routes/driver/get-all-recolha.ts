import { db } from "@/db/connection";
import { hackDriverId, hackId } from "@/lib/hack";
import Elysia from "elysia";

export const getAllRecolha = new Elysia().get("/get-all-recolha", async () => {
  return {
    recos: await db.recolha.findMany({
      where: {
        driverId: (await hackDriverId()).driverId,
        status: "pendente",
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        createdAt: true,
      },
      take: 10,
    }),
  };
});
