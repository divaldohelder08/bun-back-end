import { db } from "@/db/connection";
import { hackId } from "@/lib/hack";
import { fakerPT_BR as faker } from "@faker-js/faker";
export async function recolhaHack() {
  const camamaClients = await db.cliente.findMany({
    where: { filialId: (await hackId()).filialId },
    select: {
      id: true,
      filialId: true,
    },
  });

  const camamaDrivers = await db.driver.findMany({
    where: { filialId: (await hackId()).filialId },
    select: {
      id: true,
    },
  });

  console.log("foi");

  return await db.recolha.createMany({
    data: Array.from({ length: 12 }).map((e, index) => {
      return {
        clienteId: faker.helpers.arrayElement(camamaClients.map((e) => e.id)),
        driverId: faker.helpers.arrayElement(camamaDrivers.map((e) => e.id)),
        filialId: camamaClients[0].filialId,
        status: faker.helpers.arrayElement([
          "pendente",
          "andamento",
          "cancelada",
          "finalizada",
        ]),
        distance: faker.number.float(),
        duration: faker.number.float(),
        directions: JSON.stringify(faker.science.chemicalElement(), null, 2),
      };
    }),
  });
}
