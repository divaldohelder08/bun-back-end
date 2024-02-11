import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import { fakerPT_BR as faker } from "@faker-js/faker";
import dayjs from "dayjs";
const today = dayjs();
export async function clientHack() {
  const nomes = {
    first: faker.person.firstName(),
    last: faker.person.lastName(),
  };

  await db.payment.create({
    data: {
      endAt: today.add(1, "day").startOf("day").toDate(),
      Cliente: {
        create: {
          name: `${nomes.first} ${nomes.last}`,
          email: faker.internet
            .email({
              firstName: nomes.first,
              lastName: nomes.last,
            })
            .toLowerCase(),
          coordenadas: faker.location.nearbyGPSCoordinate({
            origin: [-8.8399, 13.2894],
          }),
          tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
          numberBI: faker.helpers.fromRegExp(
            /[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/,
          ),
          nascimento: faker.date.past({ years: 30 }),
          avatar: faker.image.avatar(),
          status: "pago",
          filialId: (await hackId()).filialId,
          address: faker.location.streetAddress(),
        },
      },
    },
  });

  console.info("hack cliente seeded");
}
