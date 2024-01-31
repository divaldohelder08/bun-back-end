import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import { fakerPT_BR as faker } from "@faker-js/faker";

export async function driverHack() {
  const nomes = {
    first: faker.person.firstName("male"),
    last: faker.person.lastName(),
  };

  await db.veiculo.create({
    data: {
      matricula: faker.helpers
        .fromRegExp(/LD-[0-9]{2}-[0-9]{2}-[^0-9]{2}/)
        .toUpperCase(),
      Driver: {
        create: {
          name: `${nomes.first} ${nomes.last}`,
          email: faker.internet
            .email({
              firstName: nomes.first,
              lastName: nomes.last,
            })
            .toLowerCase(),
          password: faker.internet.password({ length: 10 }),
          tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
          numberBI: faker.helpers.fromRegExp(
            /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/
          ),
          nascimento: faker.date.past({ years: 30 }),
          avatar: faker.image.avatar(),
          filialId: (await hackId()).filialId,
        },
      },
    },
  });
  console.info("hack driver seeded");
}
