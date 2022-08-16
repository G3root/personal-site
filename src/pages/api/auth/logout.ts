import type { APIRoute } from "astro";
import { LogOut } from "~/utils/auth";

export const get: APIRoute = async () => {
  return LogOut();
};
