import { db } from "@/db/connection";
import dayjs from "dayjs";
import Elysia, { t } from "elysia";

export const getClientById = new Elysia().get(
  "/client-by-id/:id",
  async ({ params }) => {
    const { id } = params;
    const heatData = await db.recolha.groupBy({
      by: ["createdAt"],
      where: {
        clienteId: id,
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
      client: await db.client.findUniqueOrThrow({
        where: {
          id,
        },
        select: {
          avatar: true,
          name: true,
          email: true,
          createdAt: true,
          tel: true,
          filial: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              recolhas: true,
            },
          },
        },
      }),
      heatMap: heatData.map((e) => {
        return {
          date: dayjs(e.createdAt).format("YYYY/MM/DD"),
          count: e._count,
        };
      }),
    };
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  },
);
