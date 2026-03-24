import "server-only";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password) {
  if (!password || password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `${salt}:${hash}`;
}

export function verifyPassword(password, storedPasswordHash) {
  if (!password || !storedPasswordHash?.includes(":")) {
    return false;
  }

  const [salt, storedHash] = storedPasswordHash.split(":");
  const computedHash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return timingSafeEqual(
    Buffer.from(storedHash, "hex"),
    Buffer.from(computedHash, "hex")
  );
}
