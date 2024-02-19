import Elysia from "elysia";
import { deleteClient } from "./delete";

export const indexClient = new Elysia().use(deleteClient);
