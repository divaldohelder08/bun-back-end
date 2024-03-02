import chalk from "chalk";
import { seedAgent } from "./use/agent.seed";
import { seedFull } from "./use/full.seed";
import { seedSuperManagers } from "./use/supermanager.seed";
import { db } from "@/db/connection";
import { seedRecolhas } from "./use/recolha.seed";

await seedSuperManagers();
await seedFull({ clients: 13, drivers: 20 });
await seedAgent({ agents: 41 });
await seedRecolhas({ recolhas: 51 });
console.table({
  clients: await db.client.count(),
  drivers: await db.driver.count(),
  filas: await db.filial.count(),
  managers: await db.manager.count(),
  agents: await db.agents.count(),
  recolhas:await db.recolha.count()
});
console.log(chalk.greenBright("💥 Database seeded successfully!"));

process.exit();
