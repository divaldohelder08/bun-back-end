import { db } from "./connection";
import { hackId } from "@/lib/hack";

const a=await db.recolha.findMany()
console.log(a)
