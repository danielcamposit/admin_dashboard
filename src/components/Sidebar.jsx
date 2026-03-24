"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ session }) {
  const pathname = usePathname();
  const isAdmin = session?.role === "admin";

  function getItemClass(path, isPrimary = false) {
    const isActive = pathname === path;

    return [
      "block cursor-pointer rounded p-2 transition",
      isPrimary ? "bg-gray-800 hover:bg-gray-700" : "hover:bg-gray-700",
      isActive ? "bg-gray-700 text-white" : "",
    ].join(" ");
  }

  return (
    <div className="fixed min-h-screen w-64 bg-gray-900 p-4 text-white dark:bg-gray-950">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/dashboard" className={getItemClass("/dashboard", true)}>
            Dashboard
          </Link>
        </li>

        {isAdmin && (
          <li>
            <Link href="/users" className={getItemClass("/users")}>
              Users
            </Link>
          </li>
        )}

        <li>
          <Link href="/settings" className={getItemClass("/settings")}>
            Settings
          </Link>
        </li>
      </ul>

      <div className="mt-6 border-t border-gray-700 p-4 text-sm text-gray-400">
        <p className="font-medium text-white">{session?.name || "User"}</p>
        <p className="capitalize">{session?.role || "user"}</p>
      </div>
    </div>
  );
}

export default Sidebar;
