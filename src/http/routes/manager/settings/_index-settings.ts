import Elysia from "elysia";
import { UpdateTel } from "./update-tel";
import { UpdateProfile } from "./update-profile";

export const indexManagerSetting = new Elysia().use(UpdateTel).use(UpdateProfile);
