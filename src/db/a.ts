import { hackId } from "@/lib/hack";
import { db } from "./connection";

const a = await db.recolha.findMany();
console.log(a);
