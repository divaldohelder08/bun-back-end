import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import chalk from "chalk";
import dayjs from "dayjs";
import { clientHack } from "./FilialHack/cliente";
import { driverHack } from "./FilialHack/drivers";
import { recolhaHack } from "./FilialHack/recolha";
// Cspell:ignore Camama Talatona alice veicolos Mnomes Cnomes directions Anomes Mdata

const today = dayjs();
/**
 * create 3 adm
 */
const Anomes = Array.from({ length: 2 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() };
});

await db.manager.createMany({
  data: [
    {
      email: "divaldohelder308@gmail.com",
      name: "Divaldo Hélder",
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    },
    {
      name: `${Anomes[0].first} ${Anomes[0].last}`,
      email: faker.internet
        .email({
          firstName: Anomes[0].first,
          lastName: Anomes[0].last,
        })
        .toLowerCase(),
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    },
    {
      email: faker.internet
        .email({
          firstName: Anomes[1].first,
          lastName: Anomes[1].last,
        })
        .toLowerCase(),
      name: `${Anomes[1].first} ${Anomes[1].last}`,
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
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
      email: "filial.camama.@mukumbo.dev",
      coordenadas: [-8.841198, 13.295715],
    },
    {
      name: `Golf 2 ${faker.location.state({
        abbreviated: true,
      })}`,
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      address: faker.location.streetAddress({ useFullAddress: true }),
      managerId: managers[1].id,
      email: "filial.golf2.@mukumbo.dev",
      coordenadas:[-8.888436, 13.240898],
    },
    {
      name: "vila alice",
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      address: faker.location.streetAddress({ useFullAddress: true }),
      email: "filial.vilaalice.@mukumbo.dev",
      managerId: managers[2].id,
      coordenadas: [-8.825587, 13.247704],
    },
  ],
});

const filiais = await db.filial.findMany();
console.log(chalk.yellow("✔ filiais seeded"));

await db.manager.createMany({
  data: [
    {
      email: "divaldohelder08@gmail.com",
      name: "Divaldo Hélder",
      role: "superGerente",
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    },
    {
      name: "Fernando Sebastião",
      email: "fernandosebastiao88@gmail.com",
      role: "superGerente",
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    },
    {
      name: "Edivaldo Pinheiro",
      email: "tabuaman@gmail.com",
      role: "superGerente",
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    },
  ],
});
console.log(chalk.yellow("✔ manager seeded"));

/**
 * create 3 veículos
 */
await db.veiculo.createMany({
  data: Array.from({ length: 8 }).map((_e) => {
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
const Mnomes = Array.from({ length: 8 }).map(() => {
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
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
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

console.log(chalk.yellow("✔ motorista seeded"));

/**
 * create 6 client
 */

const Cnomes = Array.from({ length: 6 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() };
});

await db.payment.createMany({
  data: Array.from({ length: 6 }).map(() => {
    return {
      endAt: today.add(1, "day").startOf("day").toDate(),
    };
  }),
});

const payments = await db.payment.findMany();

await db.cliente.createMany({
  data: Cnomes.map((i, index) => {
    return {
      name: `${i.first} ${i.last}`,
      email: faker.internet
        .email({
          firstName: i.first,
          lastName: i.last,
        })
        .toLowerCase(),
        coordenadas: faker.location.nearbyGPSCoordinate({ origin: [-8.8399, 13.2894] }),
      tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
      numberBI: faker.helpers.fromRegExp(
        /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
      ),
      nascimento: faker.date.past({ years: 30 }),
      avatar: faker.image.avatar(),
      paymentId: payments[index].id,
      status: "pago",
      filialId: faker.helpers.arrayElement([
        filiais[0].id,
        filiais[1].id,
        filiais[2].id,
      ]),
      address: faker.location.streetAddress(),
    };
  }),
});

console.log(chalk.yellow("✔ clientes seeded"));

for (let i = 0; i < 2; i++) {
  await driverHack();
  await clientHack();
}

await recolhaHack();
console.log(chalk.greenBright("Database seeded successfully!"));
process.exit();
