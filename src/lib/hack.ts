import { db } from "@/db/connection";

export async function hackId() {
  const camama = await db.filial.findFirstOrThrow({
    where: {
      name: {
        contains: "Camama",
      },
    },
  });
  return { managerId: camama.managerId, filialId: camama.id };
}
6;

export async function hackDriverId() {
  const driver = await db.driver.findFirstOrThrow({
    where: {
      filialId: (await hackId()).filialId,
    },
  });
  return { driverId: driver.id };
}

export async function hackClientId() {
  const client = await db.client.findFirstOrThrow({
    where: { filialId: (await hackId()).filialId },
    select: {
      id: true,
      filialId: true,
    },
  });

  return { clientId: client.id };
}
