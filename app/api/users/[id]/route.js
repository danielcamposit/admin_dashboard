import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  deleteUserById,
  updateUserById,
} from "../../../../src/lib/users-repository";
import { getSessionFromCookieStore } from "../../../../src/lib/session";

export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

export async function PUT(request, { params }) {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const user = await updateUserById(params.id, await request.json());
    return NextResponse.json(user);
  } catch (error) {
    const status =
      error.message === "User not found."
        ? 404
        : error.message === "Email already exists."
          ? 409
          : 400;

    return NextResponse.json(
      { error: error.message || "Failed to update user." },
      { status }
    );
  }
}

export async function DELETE(_request, { params }) {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    await deleteUserById(params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error.message === "User not found." ? 404 : 400;

    return NextResponse.json(
      { error: error.message || "Failed to delete user." },
      { status }
    );
  }
}
