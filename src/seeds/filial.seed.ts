import { db } from "@/db/connection";
import chalk from "chalk";

type managerProps = {
  name: string;
  email: string;
  role: "superGerente" | "gerente";
};

interface mainProps {
  name: string;
  tel: string;
  address: string;
  manager: managerProps;
}

async function main({ name, tel, address, manager }: mainProps) {
  return await db.filial.create({
    data: {
      name,
      tel,
      address,
      manager: {
        connect: {
          name: manager.name,
          email: manager.email,
          role: manager.role,
        },
      },
    },
  });
}
/*
main({
  name: "Camama",
  tel: "953690464",
  address: "luanda, talatona, camama",
  manager: {
    email: "divaldohelder08@gmail.com",
    name: "Divaldo Hélder",
    role: "superGerente",
  },
});
*/
console.log(chalk.yellow("✔ Filial seeded"));
