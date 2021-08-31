import { setActivePinia, createPinia } from "pinia";
import ms from "ms";

import { useAuthenticationStore } from "@/store";
import { setCookie, removeAllCookies, getUserFromCookie } from "@/helpers";
import { IUser } from "@/types";

describe("logout()", () => {
  const user: IUser = {
    username: "test",
    password: "test",
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    removeAllCookies();
  });

  test("should remove cookie", () => {
    const store = useAuthenticationStore();
    setCookie("access_token", user, {
      expires: new Date(new Date().getTime() + ms("1w")),
    });

    expect(getUserFromCookie("access_token")).not.toBeUndefined();

    store.logout();

    expect(getUserFromCookie("access_token")).toBeUndefined();
  });
});
