"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteOwnAccount } from "../services/auth";

function Settings({ session }) {
  const router = useRouter();
  const [user, setUser] = useState({
    name: session?.name || "",
    email: session?.email || "",
    notifications: true,
  });
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    localStorage.setItem("userSettings", JSON.stringify(user));
    alert("Settings saved!");
  }

  async function handleDeleteAccount() {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa acao nao pode ser desfeita."
    );

    if (!confirmDelete) {
      return;
    }

    setIsDeletingAccount(true);
    setError("");

    try {
      await deleteOwnAccount();
      router.push("/");
      router.refresh();
    } catch (deleteError) {
      setError(deleteError.message || "Failed to delete account.");
    } finally {
      setIsDeletingAccount(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Settings</h1>

      {error && (
        <p className="mb-4 max-w-md rounded bg-red-50 p-3 text-sm text-red-600">
          {error}
        </p>
      )}

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

        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Logged in as <strong>{session?.role || "user"}</strong>.
        </p>

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
          readOnly
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

      <div className="mt-6 w-96 rounded border border-red-200 bg-white p-6 shadow dark:border-red-900 dark:bg-gray-800">
        <h2 className="mb-2 text-lg font-semibold text-red-600 dark:text-red-400">
          Danger Zone
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Exclua sua propria conta para remover seu acesso a este sistema.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="rounded bg-red-600 px-4 py-2 text-white"
          disabled={isDeletingAccount}
        >
          {isDeletingAccount ? "Excluindo..." : "Excluir minha conta"}
        </button>
      </div>
    </div>
  );
}

export default Settings;
