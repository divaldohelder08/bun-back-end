import Elysia from "elysia";
import { UpdateTel } from "./update-tel";

export const indexManagerSetting = new Elysia().use(UpdateTel);
