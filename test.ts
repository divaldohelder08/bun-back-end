import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

// const { filialId } = await getCurrentUser()
const today = dayjs();
const lastMonth = today.subtract(1, "month");

const PaymentPerMonth = await db.client.create({
  data: {
    name: "Sandra Lemos",
    email: "sandralemos@gmail.com",
    coordenadas: faker.location.nearbyGPSCoordinate({
      origin: [-8.8399, 13.2894],
    }),
    tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
    numberBI: faker.helpers.fromRegExp(/[^a-zA-Z]{9}[^a-z0-9]{2}[^a-zA-Z]{2}/),
    nascimento: faker.date.past({ years: 30 }),
    avatar: faker.image.avatar(),
    address: faker.location.streetAddress(),
    filialId: (await hackId()).filialId,
    status: "pago",
    createdAt: lastMonth.toDate(),
    payments: {
      create: {
        createdAt: lastMonth.toDate(),
        endAt: lastMonth.add(1, "month").toDate(),
      },
    },
  },
});

console.table(PaymentPerMonth);
