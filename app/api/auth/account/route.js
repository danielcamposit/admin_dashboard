import { NextResponse } from "next/server";
import {
  getSessionFromCookieStore,
  SESSION_COOKIE_NAME,
} from "../../../../src/lib/session";
import {
  deleteAuthUserById,
  updateAuthUserPassword,
} from "../../../../src/lib/auth-users-repository";
import { cookies } from "next/headers";

export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    await deleteAuthUserById(session.id);

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    const status = error.message === "User not found." ? 404 : 400;

    return NextResponse.json(
      { error: error.message || "Failed to delete account." },
      { status }
    );
  }
}

export async function PATCH(request) {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const { currentPassword, newPassword } = await request.json();

    await updateAuthUserPassword(session.id, currentPassword, newPassword);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const status =
      error.message === "User not found."
        ? 404
        : error.message === "Current password is incorrect."
          ? 401
          : 400;

    return NextResponse.json(
      { error: error.message || "Failed to update password." },
      { status }
    );
  }
}
