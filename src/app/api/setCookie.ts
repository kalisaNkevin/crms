import { NextResponse } from "next/server";
import cookie from "cookie";

export const setCookie = (
  res: NextResponse,
  name: string,
  value: string,
  options: cookie.CookieSerializeOptions = {},
) => {
  const serializedCookie = cookie.serialize(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 60, // 60 hours
    sameSite: "strict",
    path: "/",
    ...options,
  });

  res.headers.append("Set-Cookie", serializedCookie);
};
