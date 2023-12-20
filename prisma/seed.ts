import { faker } from "@faker-js/faker";
import chalk from "chalk";
import { db } from "src/db/db.ts";

/**
 * create filiais
 */

const result = await db.filial.createMany({
  data: [
    {
      nome: `${faker.company.name()} ${faker.location.state()}`,
      telefone: faker.phone.number(),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
    },
    {
      nome: `${faker.company.name()} ${faker.location.state()}`,
      telefone: faker.phone.number(),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
    },
    {
      nome: `${faker.company.name()} ${faker.location.state()}`,
      telefone: faker.phone.number(),
      endereco: faker.location.streetAddress({ useFullAddress: true }),
    },
  ],
});

console.log(chalk.yellow("✔ Database reset"));
console.log(result);

/**
 * create admin
 */

//  const [admin1, admin2, admin3] = await db.admin.createMany({
//    data: [
//      {
//        nome: faker.internet.userName(),
//        email: faker.internet.email(),
//        filialId: filial1.id,
//      },
//      {
//        nome: faker.internet.userName(),
//        email: faker.internet.email(),
//        filialId: filial2.id,
//      },
//      {
//        nome: faker.internet.userName(),
//        email: faker.internet.email(),
//        filialId: filial3.id,
//      },
//    ],
//  });

/**
 * create motoristas
 */

// const [motorista1, motorista2, motorista3] = await db.motorista.createMany({
//   data:[
//     {
//       nome: faker.person.fullName(),
//       email: faker.internet.email(),
//       senha: faker.internet.password(),
//       telefone: faker.phone.number(),
//       numeroBI: faker.finance.bitcoinAddress(),
//       nascimento: faker.date.past(),
//       avatar: faker.image.avatar(),
//       localizacao: faker.address.city(),
//       filialId: filial1.id,
//     },
//     {
//       nome: faker.name.firstName(),
//       email: faker.internet.email(),
//       senha: faker.internet.password(),
//       codigo: faker.random.alphaNumeric(6),
//       telefone: faker.phone.phoneNumber(),
//       numeroBI: faker.random.alphaNumeric(9),
//       nascimento: faker.date.past(),
//       avatar: faker.image.avatar(),
//       localizacao: faker.address.city(),
//       filialId: filial2.id,
//     },
//     {
//       nome: faker.name.firstName(),
//       email: faker.internet.email(),
//       senha: faker.internet.password(),
//       codigo: faker.random.alphaNumeric(6),
//       telefone: faker.phone.phoneNumber(),
//       numeroBI: faker.random.alphaNumeric(9),
//       nascimento: faker.date.past(),
//       avatar: faker.image.avatar(),
//       localizacao: faker.address.city(),
//       filialId: filial3.id,
//     },
//   ]
//   ]
console.log(chalk.yellow("✔ Created orders"));

console.log(chalk.greenBright("Database seeded successfully!"));
process.exit();
