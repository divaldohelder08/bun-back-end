import { db } from "@/db/connection";
import { cors } from "@elysiajs/cors";
import { Elysia, t } from "elysia";
import { indexCooperativa } from "./routes/cooperativa/_index-cooperativa";
import { indexDriver } from "./routes/driver/_index-driver";
import { indexManager } from "./routes/manager/_index-manager";
import { FindPlace } from "./routes/maps/places/find-place";
import { GetRecolhaById } from "./routes/mult/get-recolha-by-id";
import { seedRecolhas } from "@/db/setRecolhas";
const app = new Elysia()
  .use(
    cors({
      credentials: true,
      allowedHeaders: ["content-type"],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
      origin: (request): boolean => {
        const origin = request.headers.get("origin");

        if (!origin) {
          return false;
        }

        return true;
      },
    }),
  )
  .use(FindPlace)
  .use(GetRecolhaById)
  .group("/find", (app) => {
    return app
      .get("/filias", () =>
        db.filial.findMany({ select: { id: true, name: true } }),
      )
      .get("/drivers", async () => {
        return await db.driver.findMany();
      })
      .get("/clients", async () => {
        return await db.client.findMany();
      })
      .get("/managers", async () => {
        return await db.manager.findMany();
      })
      .get("/recolha", async () => {
        return await db.recolha.findMany();
      })
      .get(
        "/filial/:id",
        async ({ params }) => {
          const { id } = params;
          return db.filial.findUnique({
            select: { id: true, name: true },
            where: { id },
          });
        },
        {
          params: t.Object({
            id: t.String(),
          }),
        },
      );
  })
  .group("/driver", (app) => app.use(indexDriver))
  .group("/manager", (app) => app.use(indexManager))
  .group("/cooperativa", (app) => app.use(indexCooperativa))
  .get("/pdf", async ({ set }) => {
    // set.headers('Content-Type', 'application/pdf');
    // set.headers('Content-Disposition', 'attachment; filename=agendamento.pdf');
    return Bun.file("src/agendamento.pdf");
  });
setInterval(async () => {
console.log("ciclo")
await seedRecolhas()}, Math.floor(Math.random() * 500000));
app.listen(3333);
console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
);
