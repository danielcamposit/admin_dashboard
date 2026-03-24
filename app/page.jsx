import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../src/screens/Login";
import { getSessionFromCookieStore } from "../src/lib/session";

export default async function HomePage() {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (session) {
    redirect("/dashboard");
  }

  return <Login />;
}
