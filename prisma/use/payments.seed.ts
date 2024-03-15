import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
import dayjs from "dayjs";

export async function seedPayments() {
  const today = dayjs();
  const clients = await db.client.findMany();
  const agents = await db.agents.findMany();

  for (const client of clients) {
    await db.payment.create({
      data: {
        endAt: today.add(1, "month").startOf("day").toDate(),
        clientId: client.id,
        agentId: faker.helpers.arrayElement(agents).id,
      },
    });
  }

  console.log(chalk.yellow("agents seeded"));
}
