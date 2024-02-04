import { db } from "@/db/connection";
import Elysia, { t } from "elysia";
import { GoogleMapsClient, driving } from "./client";

export const CreateRecolha = new Elysia().post(
  "create-recolha",
  async ({ params }) => {
    const { clientId } = params;

    const cliente =await db.cliente.findUniqueOrThrow({
      where: {
        id: clientId,
        status:"pago"
      },
    });

    //verificar se a filial esta a trabalhar isso no mobile

    await db.filial.findFirstOrThrow({
      where: {
        id: cliente.filialId,
        status: "aberta",
      },
    });


    const drivers=await db.driver.findMany({
      where:{
        filialId: cliente.filialId,
        status: "On"
      },
      select:{
        id:true,
        coordenadas:true
      }
    })



   await GoogleMapsClient.distancematrix({
    params:{

      mode:driving
    }
   })

    // pesquisar de como calcular a distância de vários pontos em relação ao do cliente
    const filialDrivers = await db.driver.findMany({
      where: {
        AND: [
          {
            filialId: cliente.id,
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
