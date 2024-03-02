import { db } from "@/db/connection";
import chalk from "chalk";

export async function seedSuperManagers() {
  const supers = [
    {
      name: "Divaldo Hélder",
      email: "divaldohelder08@gmail.com",
      tel: "953690464",
    },
    {
      name: "Fernando Sebastião",
      email: "fernandosebastiao888@gmail.com",
      tel: "927548754",
    },
    {
      name: "Edivaldo Pinheiro",
      email: "edivaldopinheiro@gmail.com",
      tel: "948548787",
    },
  ];

  for (const manager of supers) {
    await db.manager.create({
      data: {
        email: manager.email,
        name: manager.name,
        tel: manager.tel,
        role: "superGerente",
        sexo: "M",
      },
    });
  }
  console.log(chalk.yellow("✔ super-managers seeded"));
  return;
}
