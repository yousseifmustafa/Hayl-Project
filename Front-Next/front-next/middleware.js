import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { useAuth } from "@/context/Authcontext";

export async function middleware(req) {
  // const token = req.cookies.get("jwt")?.value;
  
  // console.log("token is :" , req.cookies.get("jwt")?.value);
  

}

export const config = {
  matcher: ["/wishlist/:path*", "/cart/:path*", "/account/:path*", "/management/:path*"],
};
