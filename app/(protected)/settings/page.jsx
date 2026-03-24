import { cookies } from "next/headers";
import Settings from "../../../src/screens/Settings";
import { getSessionFromCookieStore } from "../../../src/lib/session";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const session = getSessionFromCookieStore(cookieStore);

  return <Settings session={session} />;
}
