import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";

export const getDriverById = new Elysia().get(
  "/get-driver-by-id/:id",
  async ({ params }) => {
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
    const rowValue = await db.recolha.groupBy({
      by: ["status"],
      where: {
        driverId: id,
        status: {
          in: ["finalizada", "cancelada"],
        },
      },
      _count: true,
    });
    const heatData = await db.recolha.groupBy({
      by: ["createdAt"],
      where: {
        driverId: id,
        status: {
          in: ["finalizada", "cancelada"],
        },
      },
      _count: true,
      orderBy: {
        createdAt: "asc",
      },
    });
    return {
      driver,
      heatMap: heatData.map((e) => {
        return {
          date: dayjs(e.createdAt).format("YYYY/MM/DD"),
          count: e._count,
        };
      }),
      row: {
        finalizada: rowValue[0] ? rowValue[0]._count : 0,
        cancelada: rowValue[1] ? rowValue[1]._count : 0,
      },
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
);
