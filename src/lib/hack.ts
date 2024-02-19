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

export async function hackDriverId() {
  const driver = await db.driver.findFirstOrThrow({
    where: {
      filialId: (await hackId()).filialId,
    },
  });
  console.log(driver)
  return { driverId: driver.id };
}
