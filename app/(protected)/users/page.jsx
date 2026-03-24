import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Users from "../../../src/screens/Users";
import {
  getSessionFromCookieStore,
  isAdminSession,
} from "../../../src/lib/session";

export default async function UsersPage() {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    redirect("/");
  }

  if (!isAdminSession(session)) {
    redirect("/dashboard");
  }

  return <Users />;
}
