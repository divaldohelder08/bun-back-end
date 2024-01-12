import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
// Cspell:ignore Camama Talatona alice veicolos Mnomes Cnomes directions Anomes Mdata

/**
 * create 3 adm
 */
const Anomes = Array.from({ length: 2 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() };
});

await db.manager.createMany({
  data: [
    {
      email: "divaldohelder08@gmail.com",
      name: "Divaldo Hélder",
      role: "superGerente",
    },
    {
      name: `${Anomes[0].first} ${Anomes[0].last}`,
      email: faker.internet
        .email({
          firstName: Anomes[0].first,
          lastName: Anomes[0].last,
        })
        .toLowerCase(),
    },
    {
      email: faker.internet
        .email({
          firstName: Anomes[1].first,
          lastName: Anomes[1].last,
        })
        .toLowerCase(),
      name: `${Anomes[1].first} ${Anomes[1].last}`,
    },
  ],
});
console.log(chalk.yellow("✔ manager seeded"));
const managers = await db.manager.findMany();

/**
 * create 3 filiais
 */
await db.filial.createMany({
  data: [
    {
      name: `Camama ${faker.location.state({
        abbreviated: true,
      })}`,
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      address: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[0].id,
    },
    {
      name: `Talatona ${faker.location.state({
        abbreviated: true,
      })}`,
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      address: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[1].id,
    },
    {
      name: `vila alice ${faker.location.state({
        abbreviated: true,
      })}`,
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      address: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[2].id,
    },
  ],
});
const filiais = await db.filial.findMany();
console.log(chalk.yellow("✔ filiais seeded"));

/**
 * create 3 veículos
 */

// depois modificar o formato LD-83-34-CQ
await db.veiculo.createMany({
  data: Array.from({ length: 5 }).map((e, index) => {
    return {
      matricula: faker.helpers
        .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
        .toUpperCase(),
    };
  }),
});
const veicolos = await db.veiculo.findMany();
console.log(chalk.yellow("✔ veiculo seeded"));

/**
 * create 3 motoristas
 */
const Mnomes = Array.from({ length: 5 }).map(() => {
  return {
    first: faker.person.firstName("male"),
    last: faker.person.lastName(),
  };
});

await db.driver.createMany({
  data: Mnomes.map((i, index) => {
    return {
      name: `${i.first} ${i.last}`,
      email: faker.internet
        .email({
          firstName: i.first,
          lastName: i.last,
        })
        .toLowerCase(),
      veiculoId: veicolos[index].id,
      password: faker.internet.password({ length: 10 }),
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      numberBI: faker.helpers.fromRegExp(
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/
      ),
      nascimento: faker.date.past({ years: 30 }),
      avatar: faker.image.avatar(),
      filialId: faker.helpers.arrayElement([
        filiais[0].id,
        filiais[1].id,
        filiais[2].id,
      ]),
    };
  }),
});
const motoristas = await db.driver.findMany();
console.log(chalk.yellow("✔ motorista seeded"));

/**
 * create 6 client
 */

const Cnomes = Array.from({ length: 6 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() };
});

await db.cliente.createMany({
  data: Cnomes.map((i) => {
    return {
      name: `${i.first} ${i.last}`,
      email: faker.internet
        .email({
          firstName: i.first,
          lastName: i.last,
        })
        .toLowerCase(),
      coordenadas: faker.location.nearbyGPSCoordinate(),
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      numberBI: faker.helpers.fromRegExp(
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/
      ),
      nascimento: faker.date.past({ years: 30 }),
      avatar: faker.image.avatar(),
      filialId: faker.helpers.arrayElement([
        filiais[0].id,
        filiais[1].id,
        filiais[2].id,
      ]),
      address: faker.location.streetAddress(),
    };
  }),
});
const clientes = await db.cliente.findMany();
console.log(chalk.yellow("✔ clientes seeded"));

/**
 * create Recolhas
 */

await db.recolha.createMany({
  data: Array.from({ length: 64 }).map((e, index) => {
    return {
      clienteId: faker.helpers.arrayElement(
        Array.from({ length: 6 }).map((_, i) => clientes[i].id)
      ),
      driverId: faker.helpers.arrayElement(
        Array.from({ length: 3 }).map((_, i) => motoristas[i].id)
      ),
      filialId: faker.helpers.arrayElement(
        Array.from({ length: 3 }).map((_, i) => filiais[i].id)
      ),
      status: faker.helpers.arrayElement([
        "pendente",
        "andamento",
        "cancelado",
        "finalizada",
      ]),
      comment: faker.lorem.paragraph({ max: 1, min: 1 }),
      rate: Number(faker.helpers.fromRegExp(/[0-5]{1}/)),
      distance: faker.number.float(),
      duration: faker.number.float(),
      directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
    };
  }),
});

console.log(chalk.yellow("✔ recolhas seeded"));
console.log(chalk.greenBright("Database seeded successfully!"));
process.exit();
