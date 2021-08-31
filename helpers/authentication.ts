import { Buffer } from "buffer";
import { useCookies } from "@vueuse/integrations";
// eslint-disable-next-line import/named
import { CookieSetOptions, CookieGetOptions } from "universal-cookie";
import { IUser } from "@/types";

/**
 * Encode plain text to base64
 * @param text plain text
 * @returns plain text encoded to base64
 */
export function base64Encode(value: string): string {
  return Buffer.from(value).toString("base64");
}

/**
 * Decode base64 text to plain text
 * @param text base64 text
 * @returns base64 decoded text
 */
export function base64Decode(text: string): string {
  return Buffer.from(text, "base64").toString("utf-8");
}

/**
 * Set Cookie by name
 * @param name Cookie name, example: "token"
 * @param value Cookie value, example: "123456789"
 */
export function setCookie(
  name: string,
  value: IUser,
  options?: CookieSetOptions
): void {
  const _cookie = useCookies([name]);

  _cookie.set(name, base64Encode(JSON.stringify(value)), options);
}

/**
 * Get cookie by name.
 * @param name Cookie name, example "token".
 * @returns Cookie value, cookie not specified return undefined.
 */
export function getCookie(
  name: string,
  options?: CookieGetOptions
): string | undefined {
  const _cookie = useCookies([name]).get<string | undefined>(name, options);

  if (_cookie) {
    return base64Decode(_cookie);
  }

  return undefined;
}

/**
 * Remove cookie by name.
 * @param name Cookie name, example "token"
 * @example
 * ```ts
 * removeCookie("token");
 * ```
 */
export function removeCookie(name: string): void {
  const _cookie = useCookies([name]);
  _cookie.remove(name);
}

/**
 *  Get user from cookie if cookie is valid
 * @param name Cookie name, example "token"
 * @example
 * ```ts
 * const user = getUserFromCookie("token");
 * ```
 * @returns User object if cookie is valid, otherwise undefined
 */
export function getUserFromCookie(name: string): IUser | undefined {
  try {
    const _cookie = useCookies([name]);
    const _cookieValue = _cookie.get<string | undefined>(name);

    if (_cookieValue) {
      /**
       * Parsed {@link IUser user} from cookie
       */
      return JSON.parse(base64Decode(_cookieValue)) as IUser;
    }

    // Cookie not specified, return undefined
    return undefined;
  } catch {
    // JSON parse error occurs when cookie is not valid,
    removeCookie(name);
    return undefined;
  }
}

export function removeAllCookies(): void {
  // Solition from // https://stackoverflow.com/a/33366171/15282485
  const cookies = document.cookie.split("; ");
  for (let c = 0; c < cookies.length; c++) {
    const d = window.location.hostname.split(".");
    while (d.length > 0) {
      const cookieBase =
        encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
        "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
        d.join(".") +
        " ;path=";
      const p = location.pathname.split("/");
      document.cookie = cookieBase + "/";
      while (p.length > 0) {
        document.cookie = cookieBase + p.join("/");
        p.pop();
      }
      d.shift();
    }
  }
}
