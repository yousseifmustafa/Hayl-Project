import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const lowercasePath = url.pathname.toLowerCase();

  const rewrites = {
    "/login": "/auth/login",
    "/signup": "/auth/signup",
    "/forgetpassword": "/auth/forgetPassword",
    "/registervalidate": "/auth/RegisterValidate",
    "/resetvalidate": "/auth/ResetValidate",
    "/resetpassword": "/auth/resetPassword",
  };

  if (rewrites[lowercasePath]) {
    url.pathname = rewrites[lowercasePath];
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
