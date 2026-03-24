import { NextResponse } from "next/server";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "../../../../src/lib/session";
import { registerAuthUser } from "../../../../src/lib/auth-users-repository";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const user = await registerAuthUser(await request.json());
    const token = createSessionToken(user);
    const response = NextResponse.json(user, { status: 201 });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    const status = error.message === "Email already exists." ? 409 : 400;

    return NextResponse.json(
      { error: error.message || "Failed to register user." },
      { status }
    );
  }
}
