import { db } from "@/db/connection";
import { hackDriverId, hackId } from "@/lib/hack";
import Elysia, { t } from "elysia";

export const UpdateKey = new Elysia().put(
  "/update-key",
  async ({ body, set }) => {
    const id = (await hackId()).managerId;
    const { antiga, nova } = body;
    console.log(antiga, nova);
    //pegar aquelas merdas do header
    const manager = await db.manager.findUnique({
      where: {
        password: antiga,
        id,
      },
    });
    if (!manager) {
      throw Error("Atual senha incorreta");
    }

    await db.manager.update({
      where: {
        id: manager.id,
      },
      data: {
        password: nova,
      },
    });
    set.status = 204;
  },
  {
    body: t.Object({
      antiga: t.String(),
      nova: t.String(),
    }),
  },
);
