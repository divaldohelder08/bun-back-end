import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
import dayjs from "dayjs";
const today = dayjs();
const filiais = await db.filial.findMany();
const motoristas = await db.driver.findMany();
const clientes = await db.client.findMany();
await db.recolha.createMany({
  data: Array.from({ length: 54 }).map(() => {
    return {
      clienteId: faker.helpers.arrayElement(
        Array.from({ length: 4 }).map((_, i) => clientes[i].id),
      ),
      driverId: faker.helpers.arrayElement(
        Array.from({ length: 3 }).map((_, i) => motoristas[i].id),
      ),
      filialId: faker.helpers.arrayElement(
        Array.from({ length: filiais.length }).map((_, i) => filiais[i].id),
      ),
      status: faker.helpers.arrayElement([
        "pendente",
        "andamento",
        "cancelada",
        "finalizada",
      ]),
      comment: faker.lorem.paragraph({ max: 1, min: 1 }),
      distance: faker.number.float(),
      duration: faker.number.float(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
      createdAt: today.subtract(1, "day").toDate(),
    };
  }),
});

console.log(chalk.yellow("✔ recolhas seeded"));
