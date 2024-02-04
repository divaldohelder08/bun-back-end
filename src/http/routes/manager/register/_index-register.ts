import Elysia from "elysia";
import { registerDriver } from "./register-driver";

export const indexRegister = new Elysia().use(registerDriver);
