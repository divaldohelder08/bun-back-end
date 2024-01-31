import Elysia from "elysia";
import { updateDriverStatus } from "./driver-update-status";

export const indexDriver = new Elysia().use(updateDriverStatus);
