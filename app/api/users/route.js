import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createUser, getAllUsers } from "../../../src/lib/users-repository";
import {
  getSessionFromCookieStore,
  isAdminSession,
} from "../../../src/lib/session";

export const runtime = "nodejs";

function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
}

function forbiddenResponse() {
  return NextResponse.json({ error: "Admin access required." }, { status: 403 });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  try {
    const users = await getAllUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to load users." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    return unauthorizedResponse();
  }

  if (!isAdminSession(session)) {
    return forbiddenResponse();
  }

  try {
    const user = await createUser(await request.json());
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const status = error.message === "Email already exists." ? 409 : 400;

    return NextResponse.json(
      { error: error.message || "Failed to create user." },
      { status }
    );
  }
}
