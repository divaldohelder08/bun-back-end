import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";

const Cnomes = Array.from({ length: 6 }).map(() => {
  return { first: faker.person.firstName(), last: faker.person.lastName() };
});

const a = await db.cliente.createMany({
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
      filialId: "40912788-749c-4186-985e-32d9484a14e4",
      address: faker.location.streetAddress(),
    };
  }),
});
console.log(a);
console.log(chalk.yellow("✔ clientes seeded"));
