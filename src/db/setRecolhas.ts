import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";

export async function seedRecolhas() {
  const filial = await db.filial.findFirst();

  if (!filial) return;
  const filialDrivers = await db.driver.findMany({
    where: { filialId: filial?.id },
  });
  const filialClients = await db.client.findMany({
    where: { filialId: filial?.id },
  });

  await db.recolha.create({
    data: {
      clienteId: faker.helpers.arrayElement(filialClients).id,
      driverId: faker.helpers.arrayElement(filialDrivers).id,
      filialId: filial?.id,
      status: faker.helpers.arrayElement([
        "andamento",
        "cancelada",
        "finalizada",
      ]),
      distance: faker.number.float().toString(),
      duration: faker.number.float().toString(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
    },
  });

  await db.recolha.create({
    data: {
      clienteId: faker.helpers.arrayElement(filialClients).id,
      driverId: faker.helpers.arrayElement(filialDrivers).id,
      filialId: filial?.id,
      status: "pendente",
    },
  });
  console.log(chalk.yellow("recolhas seeded"));
}

