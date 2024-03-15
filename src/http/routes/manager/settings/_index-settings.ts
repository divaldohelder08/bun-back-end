import Elysia from "elysia";
import { UpdateKey } from "./update-key";
import { UpdateProfile } from "./update-profile";
import { UpdateTel } from "./update-tel";

export const indexManagerSetting = new Elysia()
  .use(UpdateTel)
  .use(UpdateProfile)
  .use(UpdateKey);
