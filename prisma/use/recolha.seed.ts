import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";

interface seedRecolhasProps {
  recolhas: number;
}
export async function seedRecolhas({ recolhas: recolhasLength }: seedRecolhasProps) {
  const filias = await db.filial.findMany();
  const recolhas = Array.from({ length: recolhasLength });

  for (const filial of filias) {
    const filialDrivers = await db.driver.findMany({
      where: { filialId: filial.id },
    });
    const filialClients = await db.client.findMany({
      where: { filialId: filial.id },
    });

    for (const recolha of recolhas) {
      await db.recolha.create({
        data: {
          clienteId: faker.helpers.arrayElement(filialClients).id,
          driverId: faker.helpers.arrayElement(filialDrivers).id,
          filialId: filial.id,
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
    }
  }

  for (const filial of filias) {
    const filialDrivers = await db.driver.findMany({
      where: { filialId: filial.id },
    });
    const filialClients = await db.client.findMany({
      where: { filialId: filial.id },
    });

    for (const recolha of recolhas) {
      await db.recolha.create({
        data: {
          clienteId: faker.helpers.arrayElement(filialClients).id,
          driverId: faker.helpers.arrayElement(filialDrivers).id,
          filialId: filial.id,
          status:"pendente",
        },
      });
    }
  }

  console.log(chalk.yellow("recolhas seeded"));
}
