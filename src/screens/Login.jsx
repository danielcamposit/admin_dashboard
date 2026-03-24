"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
      router.refresh();
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 dark:text-white">
      <div className="w-80 rounded bg-white p-6 shadow dark:bg-gray-800">
        <h2 className="mb-2 text-xl font-bold">Login</h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Use <strong>admin@test.com</strong> and <strong>123456</strong> or your
          own admin credentials from `.env.local`.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="mb-4 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;
