import lightcookie from "lightcookie";
import ms from "ms";

import {
  base64Encode,
  getCookie,
  getUserFromCookie,
  removeAllCookies,
  removeCookie,
  setCookie,
} from "@/helpers";
import { IUser } from "@/types";

describe("Cookie Functions", () => {
  beforeEach(() => {
    removeAllCookies();
  });

  describe("setCookie()", () => {
    test("should set cookie", () => {
      const _cookieValue: IUser = { username: "set_user", password: "123456" };
      setCookie("token", _cookieValue, {
        expires: new Date(new Date().getTime() + ms("1w")),
      });
      const cookies = lightcookie.parse(document.cookie);

      expect(cookies.token).not.toBeUndefined();
      expect(cookies.token).toBe(base64Encode(JSON.stringify(_cookieValue)));
    });
  });

  describe("getCookie()", () => {
    test("should get cookie if specified", () => {
      const user = JSON.stringify({ username: "get_user", password: "123456" });

      document.cookie = `token=${base64Encode(user)}; expires=${new Date(
        new Date().getTime() + ms("1w")
      ).toUTCString()}`;

      const _cookie = getCookie("token");

      expect(_cookie).not.toBeUndefined();
      expect(_cookie).toBe(user);
    });

    test("should not get cookie if not specified", () => {
      const _cookie = getCookie("nonexistent_cookie");

      expect(_cookie).toBeUndefined();
    });
  });

  describe("getUserFromCookie()", () => {
    test("should get User from cookie if specified", () => {
      const user = JSON.stringify({ username: "get_user", password: "123456" });

      document.cookie = `token=${base64Encode(user)}; expires=${new Date(
        new Date().getTime() + ms("1w")
      ).toUTCString()}`;

      const userFromCookie = getUserFromCookie("token");

      expect(userFromCookie).not.toBeUndefined();
      expect(userFromCookie).toEqual(JSON.parse(user));
    });

    test("should not get User from cookie if not specified", () => {
      const user = getUserFromCookie("token");

      expect(user).toBeUndefined();
    });
  });

  describe("removeCookie()", () => {
    test("should remove cookie", () => {
      const _cookieValue: IUser = {
        username: "remove_user",
        password: "123456",
      };
      document.cookie = `token=${base64Encode(
        JSON.stringify(_cookieValue)
      )}; expires=${new Date(new Date().getTime() + ms("1w")).toUTCString()}`;

      expect(lightcookie.parse(document.cookie).token).not.toBeUndefined();

      removeCookie("token");

      expect(lightcookie.parse(document.cookie).token).toBeUndefined();
    });
  });
});
