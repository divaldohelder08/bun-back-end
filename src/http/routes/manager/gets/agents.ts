import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import Elysia from "elysia";
//Spell:ignore FILIALID_BASE
export const getAllAgents = new Elysia().get("/agents", async () => {
  return await db.agents.findMany({
    where: {
      filialId: (await hackId()).filialId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      avatar: true,
      tel: true,
    },
  });
});
