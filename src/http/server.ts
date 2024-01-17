import { db } from "@/db/connection";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { indexCooperativa } from "./routes/cooperativa/_index-cooperativa";
import { indexDriver } from "./routes/driver/_index-driver";
import { indexManager } from "./routes/manager/_index-manager";
import { PlacesService } from "./routes/maps/places/places";
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
  .group("/find", (app) => {
    return app
      .get("/filiais", () =>
        db.filial.findMany({ select: { id: true, name: true } }),
      )
      .get("/drivers", async () => {
        return await db.driver.findMany();
      })
      .get("/managers", async () => {
        return await db.manager.findMany();
      });
  })
  .use(PlacesService)
  .group("/driver", (app) => app.use(indexDriver))
  .group("/manager", (app) => app.use(indexManager))
  .group("/cooperativa", (app) => app.use(indexCooperativa));

app.listen(3333);
console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
);
