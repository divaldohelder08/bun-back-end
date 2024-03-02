import { db } from "./connection";

const a = await db.recolha.findMany();
console.log(a);
