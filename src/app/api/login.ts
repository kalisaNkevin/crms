import { TOKEN_NAME } from "@lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { setCookie } from "./setCookie";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Token is required" },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    success: true,
    message: "Token cookie saved successfully!",
  });

  setCookie(response, TOKEN_NAME, token);

  return response;
}
