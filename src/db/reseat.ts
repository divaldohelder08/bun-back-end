import { db } from "./connection";
await db.driver.deleteMany();
await db.veiculo.deleteMany();
await db.payment.deleteMany();
await db.client.deleteMany();
await db.filial.deleteMany();
await db.manager.deleteMany();
await db.recolha.deleteMany();
