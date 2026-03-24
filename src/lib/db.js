import "server-only";
import { neon } from "@neondatabase/serverless";

function getDatabaseUrl() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not configured. Add your Neon connection string to .env.local."
    );
  }

  return databaseUrl;
}

export function getSql() {
  return neon(getDatabaseUrl());
}
