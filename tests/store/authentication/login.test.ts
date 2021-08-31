import { setActivePinia, createPinia } from "pinia";
import ms from "ms";

import { useAuthenticationStore } from "@/store";
import { setCookie, removeAllCookies, getUserFromCookie } from "@/helpers";
import { IUser } from "@/types";

describe("login()", () => {
  const users: {
    primary: IUser;
    secondary: IUser;
    [key: string]: IUser;
  } = {
    primary: {
      name: "Primary",
      username: "primary",
      password: "primary",
    },
    secondary: {
      name: "Secondary",
      username: "secondary",
      password: "secondary",
    },
  };
  let cookie = getUserFromCookie("access_token");

  beforeEach(() => {
    setActivePinia(createPinia());
    removeAllCookies();
    cookie = getUserFromCookie("access_token");
  });

  test("should login if not logged in before", () => {
    const store = useAuthenticationStore();
    store.users = [users.primary, users.secondary];

    expect(cookie).toBeUndefined();

    store.login(users.primary);

    cookie = getUserFromCookie("access_token");
    expect(cookie).not.toBeUndefined();
    expect(cookie!.username).toBe(users.primary.username);
    expect(cookie!.password).toBe(users.primary.password);
  });

  test("should not login if the cookie is specified, retrieve session from it", () => {
    const store = useAuthenticationStore();
    store.users = [users.primary, users.secondary];

    expect(cookie).toBeUndefined();

    setCookie("access_token", users.primary, {
      expires: new Date(new Date().getTime() + ms("1w")),
    });

    store.login(users.secondary);

    cookie = getUserFromCookie("access_token");
    expect(cookie).not.toBeUndefined();
    expect(cookie!.username).toBe(users.primary.username);
    expect(cookie!.password).toBe(users.primary.password);
  });
});
