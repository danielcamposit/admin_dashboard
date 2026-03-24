"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "../services/auth";

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const titles = {
    "/dashboard": "Dashboard",
    "/users": "Users",
    "/settings": "Settings",
  };

  async function handleLogout() {
    setIsLoading(true);

    try {
      await logout();
      router.push("/");
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow dark:bg-gray-800 dark:text-white">
      <h1 className="font-bold">{titles[pathname] || "Admin Panel"}</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export default Navbar;
