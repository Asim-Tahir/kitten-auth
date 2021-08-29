import { Buffer } from "buffer";
import { IUser } from "@/types";

export function base64Encode(text: string): string {
  return Buffer.from(text).toString("base64");
}

export function base64Decode(text: string): string {
  return Buffer.from(text, "base64").toString("utf-8");
}

export function parseCookie(cookie: string): IUser | null {
  if (cookie.length !== 0) {
    const [username, password, name] = cookie.trim().split(":");
    if ((username && password) || name) {
      return { username, password, name };
    }
  }
  return null;
}
