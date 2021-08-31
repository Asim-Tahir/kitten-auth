import { setActivePinia, createPinia } from "pinia";
import ms from "ms";

import { useAuthenticationStore } from "@/store";
import { removeAllCookies, getUserFromCookie, setCookie } from "@/helpers";
import { IUser } from "@/types";

describe("register()", () => {
  const users: {
    primary: IUser;
    secondary: IUser;
    new: IUser;
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
    new: {
      name: "New",
      username: "new",
      password: "new",
    },
  };
  let cookie = getUserFromCookie("access_token");

  beforeEach(() => {
    setActivePinia(createPinia());
    removeAllCookies();
    cookie = getUserFromCookie("access_token");
  });

  test("should register if not registered before", () => {
    const store = useAuthenticationStore();
    store.users = [users.primary, users.secondary];

    expect(
      store.users.find(
        (u) =>
          u.username === users.new.username && u.password === users.new.password
      )
    ).toBeUndefined();
    expect(cookie).toBeUndefined();

    store.register(users.new);

    cookie = getUserFromCookie("access_token");
    expect(cookie).not.toBeUndefined();
    expect(cookie!.username).toBe(users.new.username);
    expect(cookie!.password).toBe(users.new.password);

    expect(
      store.users.find(
        (u) =>
          u.username === users.new.username && u.password === users.new.password
      )
    ).not.toBeUndefined();
  });

  test("should not register if already registered", () => {
    const store = useAuthenticationStore();
    store.users = [users.primary, users.secondary];

    expect(
      store.users.filter(
        (u) =>
          u.username === users.primary.username &&
          u.password === users.primary.password
      )
    ).toHaveLength(1);
    expect(cookie).toBeUndefined();

    store.register(users.primary);

    cookie = getUserFromCookie("access_token");

    expect(
      store.users.filter(
        (u) =>
          u.username === users.primary.username &&
          u.password === users.primary.password
      )
    ).toHaveLength(1);

    expect(cookie).not.toBeUndefined();
    expect(cookie!.username).toBe(users.primary.username);
    expect(cookie!.password).toBe(users.primary.password);
  });

  test("should not register if cookie specified, retrieve session from it", () => {
    const store = useAuthenticationStore();
    store.users = [users.primary, users.secondary];

    expect(cookie).toBeUndefined();
    setCookie("access_token", users.primary, {
      expires: new Date(new Date().getTime() + ms("1w")),
    });

    expect(
      store.users.filter(
        (u) =>
          u.username === users.primary.username &&
          u.password === users.primary.password
      )
    ).toHaveLength(1);

    store.register(users.secondary);

    cookie = getUserFromCookie("access_token");
    expect(cookie).not.toBeUndefined();
    expect(cookie!.username).toBe(users.primary.username);
    expect(cookie!.password).toBe(users.primary.password);
  });
});
