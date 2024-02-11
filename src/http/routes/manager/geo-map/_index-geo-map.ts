import Elysia from "elysia";
import { getClients } from "./clients";
import { getDrivers } from "./drivers";

export const indexGeoMap=new Elysia().use(getClients).use(getDrivers)