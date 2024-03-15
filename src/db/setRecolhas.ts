import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
import dayjs from "dayjs";

export async function seedRecolhas() {
  const filial = faker.helpers.arrayElement(await db.filial.findMany());
  //  const filial = { id: (await hackId()).filialId };

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
        // "andamento",
        "cancelada",
        // "finalizada",
      ]),
      distance: faker.number.float().toString(),
      duration: faker.number.float().toString(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
      // createdAt: dayjs().subtract(10, "days").toDate(),
    },
  });

  await db.recolha.create({
    data: {
      clienteId: faker.helpers.arrayElement(filialClients).id,
      driverId: faker.helpers.arrayElement(filialDrivers).id,
      filialId: filial?.id,
      status: "pendente",
      //  createdAt: dayjs().subtract(10, "days").toDate(),
    },
  });
  console.log(chalk.yellow("recolhas seeded"));
}
