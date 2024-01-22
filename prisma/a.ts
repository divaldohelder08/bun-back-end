import { db } from "@/db/connection";

const payments = await db.payment.findMany();
console.log(payments);
