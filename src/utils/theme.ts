import cookie from "cookie";
import { THEME_COOKIE_NAME } from "~/constants";

export function getThemeCookie(headers: Headers) {
  const cookie_ = headers.get("cookie") ?? "";

  const parsed = cookie.parse(cookie_);

  if (parsed[THEME_COOKIE_NAME]) {
    const value = JSON.parse(parsed[THEME_COOKIE_NAME]);
    return value as { mode: "dark-theme" | "light-theme"; theme: number };
  }
  return null;
}
