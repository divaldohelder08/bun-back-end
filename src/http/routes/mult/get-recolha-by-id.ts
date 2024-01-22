import { db } from "@/db/connection";
import Elysia, { t } from "elysia";

export const GetRecolhaById = new Elysia().get(
  "/get-recolha-by-id/:id",
  async ({ params }) => {
    const { id } = params;
    return await db.recolha.findFirstOrThrow({
      where: {
        id,
      },
      select: {
      id:true,
        status: true,
        createdAt: true,
        rate: true,
        duration: true,
        cliente: {
          select: {
            name: true,
            tel: true,
            email: true,
          },
        },
        driver: {
          select: {
            name: true,
            tel: true,
            email: true,
            veiculo: {
              select: {
                matricula: true,
              },
            },
          },
        },
        filial: {
          select: {
            name: true,
          },
        },
      },
    });
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
);
