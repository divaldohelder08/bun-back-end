import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
const filiais = await db.filial.findMany();
const motoristas = await db.driver.findMany({
  where: {
    NOT: {
      email: "fabio_nogueira81@bol.com.br",
    },
  },
});
const clientes = await db.cliente.findMany();

await db.recolha.createMany({
  data: Array.from({ length: 5 }).map(() => {
    return {
      clienteId: faker.helpers.arrayElement(
        Array.from({ length: 4 }).map((_, i) => clientes[i].id),
      ),
      driverId: faker.helpers.arrayElement(
        Array.from({ length: motoristas.length }).map(
          (_, i) => motoristas[i].id,
        ),
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
      distance: faker.number.float(),
      duration: faker.number.float(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
    };
  }),
});
console.log(chalk.yellow("✔ foi"));
console.log(chalk.yellow("✔ recolhas seeded"));
process.exit();
