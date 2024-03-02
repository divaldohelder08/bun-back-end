import { db } from "@/db/connection";
import { fakerPT_BR as faker } from "@faker-js/faker";
import chalk from "chalk";
import dayjs from "dayjs";

interface seedAgentProps {
  agents: number;
}
export async function seedAgent({ agents: agentsLength }: seedAgentProps) {
  const today = dayjs();
  enum sexo {
    masculino = "M",
    feminino = "F",
  }

  const Agents = Array.from({ length: agentsLength }).map(() => {
    const sex = faker.helpers.enumValue(sexo);
    return {
      first: faker.person.firstName(sex === "M" ? "male" : "female"),
      last: faker.person.lastName(sex === "M" ? "male" : "female"),
      sexo: sex,
    };
  });

  for (const agent of Agents) {
    await db.agents.create({
      data: {
        name: faker.person.fullName({
          firstName: agent.first,
          lastName: agent.last,
        }),
        email: faker.internet.email({
          provider: "mukumbo.dev",
          firstName: agent.first,
          lastName: agent.last,
        }),
        tel: faker.helpers.fromRegExp(/9[1-5][0-9]{7}/),
        avatar: faker.image.avatar(),
        sexo: agent.sexo,
      },
    });
  }
  const agents = await db.agents.findMany();
  const clients = await db.client.findMany();

  for (const client of clients) {
    await db.payment.create({
      data: {
        endAt: today.add(1, "day").startOf("day").toDate(),
        clientId: client.id,
        agentId: faker.helpers.arrayElement(agents).id,
      },
    });
  }

  console.log(chalk.yellow("agents seeded"));
}
