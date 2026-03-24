"use client";

import { useEffect, useState } from "react";

function Settings() {
  const [user, setUser] = useState({
    name: "Daniel",
    email: "daniel@email.com",
    notifications: true,
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function handleSave() {
    localStorage.setItem("userSettings", JSON.stringify(user));
    alert("Settings saved!");
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      <div className="mb-6 w-96 rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Theme</h2>

        <label className="flex items-center gap-3">
          <span>Light</span>

          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
          />

          <span>Dark</span>
        </label>
      </div>

      <div className="mb-6 w-96 rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Profile</h2>

        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="mb-2 w-full rounded border p-2 text-black dark:bg-gray-700 dark:text-white"
          placeholder="Name"
        />

        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full rounded border p-2 text-black dark:bg-gray-700 dark:text-white"
          placeholder="Email"
        />
      </div>

      <div className="mb-6 w-96 rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Security</h2>

        <input
          type="password"
          placeholder="New Password"
          className="mb-2 w-full rounded border p-2 text-black dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full rounded border p-2 text-black dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="mb-6 w-96 rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold">Preferences</h2>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={user.notifications}
            onChange={(e) =>
              setUser({
                ...user,
                notifications: e.target.checked,
              })
            }
          />
          Enable notifications
        </label>
      </div>

      <button
        onClick={handleSave}
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
