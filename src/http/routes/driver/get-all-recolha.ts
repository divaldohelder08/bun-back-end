import { db } from "@/db/connection";
import Elysia from "elysia";
import { authentication } from "./authentication";

export const getAllRecolha = new Elysia()
  .use(authentication)
  .get("/get-all-recolha", async ({ getCurrentUser }) => {
    const { sub } = await getCurrentUser();
    console.log(sub)
    return await db.recolha.findMany({
      where: {
        driverId: sub,
        status: "pendente",
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
        createdAt: true,
        cliente: {
          select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
            tel: true,
          },
        },
      },
      take: 10,
    });
  });
