import { db } from "@/db/connection";
import { env } from "@/env";
import Elysia, { t } from "elysia";
import { authentication } from "./authentication";
type Statusvalue= "On" | "Chuva" | "Noite";
// Spell:ignore Statusvalue

export const updateProfile = new Elysia().use(authentication).put(
  "/profile",
  async ({ getManagedFilialId, set, body }) => {
    const filialId = env.FILIALID_BASE
      ? env.FILIALID_BASE
      : "clqinw2x800042sgo1q9o97pe";

    const { status } = body;

    await db.filial.update({
      data: {
        status,
      },
      where: {
        id: filialId,
      },
    });

    set.status = 204;
  },
  {
    body: t.Object({
      status: t.Enum<Statusvalue, >(["On", "Chuva", "Noite"]),
    })
  }
);

// Statusvalue: z.enum<Statusvalue, ["On", "Chuva", "Noite"]>([
//     "On",
//     "Chuva",
//     "Noite",
//   ]),
