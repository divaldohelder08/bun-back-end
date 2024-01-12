import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const getDriverById = new Elysia().get(
  "/get-driver-by-id/:id",
  async ({ params, set }) => {
    const { id } = params;

    const driver = await db.driver.findFirst({
      where: {
        id,
      },
      select: {
        avatar: true,
        name: true,
        email: true,
        createdAt: true,
        tel: true,
        veiculo: {
          select: {
            matricula: true,
          },
        },
        filial: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!driver) {
      throw new Error("Motorista ñ encontrado");
    }

    return {
      driver,
      HeatMap: await db.recolha.groupBy({
        by: ["createdAt"],
        where: {
          driverId: id,
        },
        _count: true,
        orderBy: {
          createdAt: "asc",
        },
      }),
      row: await db.recolha.groupBy({
        by: ["status"],
        where: {
          driverId: id,
          status: {
            in: ["cancelado", "finalizada"],
          },
        },
        _count: true,
      }),
    };

    // await db.recolha.findMany({
    //   where:{
    //     driverId:id
    //   },
    //})
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
