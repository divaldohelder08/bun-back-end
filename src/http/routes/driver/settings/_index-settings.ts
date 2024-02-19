import Elysia from "elysia";
import { UpdateKey } from "./update-key";

export const indexSettings = new Elysia().use(UpdateKey);
