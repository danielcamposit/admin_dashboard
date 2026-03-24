"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../services/auth";

function Login() {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setIsLoading(true);
    setError("");

    try {
      if (mode === "register") {
        await register(name, email, password);
      } else {
        await login(email, password);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (authError) {
      setError(authError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow dark:bg-gray-800">
        <div className="mb-4 flex rounded bg-gray-100 p-1 dark:bg-gray-700">
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            className={`w-1/2 rounded px-3 py-2 text-sm font-medium ${
              mode === "login"
                ? "bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            className={`w-1/2 rounded px-3 py-2 text-sm font-medium ${
              mode === "register"
                ? "bg-white text-gray-900 shadow dark:bg-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-300"
            }`}
          >
            Criar conta
          </button>
        </div>

        <h2 className="mb-2 text-xl font-bold">
          {mode === "login" ? "Login" : "Criar conta"}
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          {mode === "login"
            ? "Entre com uma conta cadastrada no sistema."
            : "Cadastre um novo usuario para acessar o dashboard."}
        </p>

        {mode === "register" && (
          <input
            type="text"
            placeholder="Nome"
            value={name}
            className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="mb-2 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          className="mb-4 w-full rounded border p-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="mb-3 rounded bg-red-50 p-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white w-full py-2 rounded"
          disabled={isLoading}
        >
          {isLoading
            ? mode === "login"
              ? "Entrando..."
              : "Criando conta..."
            : mode === "login"
              ? "Entrar"
              : "Cadastrar"}
        </button>
      </div>
    </div>
  );
}

export default Login;
