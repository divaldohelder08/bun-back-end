import { db } from "@/db/connection";
import Elysia, { t } from "elysia";
import { GoogleMapsClient, driving } from "./client";

export const CreateRecolha = new Elysia().post(
  "create-recolha",
  async ({ params }) => {
    const { clientId } = params;

    const cliente = db.cliente.findUniqueOrThrow({
      where: {
        id: clientId,
      },
    });

    //verificar se a filial esta a trabalhar isso no mobile

    await db.filial.findFirstOrThrow({
      where: {
        id: (await cliente).id,
        status: "On",
      },
    });

   await GoogleMapsClient.({
    params:{

      mode:driving
    }
   })

    // pesquisar de como calcular a distância de vários pontos em relação ao do cliente
    const filialDrivers = await db.driver.findMany({
      where: {
        AND: [
          {
            filialId: (await cliente).id,
            status: "On",
          },
        ],
      },
    });
  },
  {
    params: t.Object({
      clientId: t.String(),
      filialId: t.Optional(t.String()),
    }),
  }
);
