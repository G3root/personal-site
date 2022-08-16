import cookie, { CookieSerializeOptions } from "cookie";
import { AUTH_COOKIE_NAME, SESSION_SECRET } from "~/constants";
import jwt, { SignOptions } from "jsonwebtoken";

export type TokenPayload = {
  id: string;
  name: string;
  gm_count: number;
};

export function GetUser(headers: Headers) {
  const token = getAuthToken(headers);
  if (!token) {
    return null;
  }
  const user = VerifyToken(token);
  if (!user) {
    return null;
  }
  return user;
}

export function getAuthToken(headers: Headers) {
  const cookie_ = headers.get("cookie") ?? "";
  const parsed = cookie.parse(cookie_);
  if (parsed[AUTH_COOKIE_NAME]) {
    return parsed[AUTH_COOKIE_NAME];
  }
  return null;
}

export function VerifyToken(token: string) {
  try {
    const verifiedToken = jwt.verify(token, SESSION_SECRET) as TokenPayload;
    return verifiedToken;
  } catch (e) {
    return null;
  }
}

export function GenerateAuthToken(
  payload: TokenPayload,
  options?: SignOptions | undefined
) {
  return jwt.sign(payload, SESSION_SECRET, options);
}

export function generateAuthCookie(
  value: string,
  options?: CookieSerializeOptions
) {
  return cookie.serialize(AUTH_COOKIE_NAME, value, {
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
}

export function LogOut() {
  return new Response(null, {
    status: 200,
    headers: {
      "Set-Cookie": generateAuthCookie("", { expires: new Date(0) }),
    },
  });
}
