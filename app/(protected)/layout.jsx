import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProtectedShell from "../../src/components/ProtectedShell";
import { getSessionFromCookieStore } from "../../src/lib/session";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  if (!session) {
    redirect("/");
  }

  return <ProtectedShell>{children}</ProtectedShell>;
}
