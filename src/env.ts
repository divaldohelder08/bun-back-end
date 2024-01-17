import { z } from "zod";

const envSchema = z.object({
  API_BASE_URL: z.string().url(),
  FRONT_BASE_URL: z.string().url(),
  AUTH_REDIRECT_URL_MANAGER: z.string().url(),
  AUTH_REDIRECT_URL_SUPERMANAGER: z.string().url(),
  AUTH_REDIRECT_URL_DRIVER: z.string().url(),
  DATABASE_URL: z.string().url().min(1),
  JWT_SECRET_KEY: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  FILIALID_BASE: z.string(),
  GOOGLE_MAPS_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
