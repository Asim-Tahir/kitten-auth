// eslint-disable-next-line import/named
import { defineStore, StateTree, GettersTree, ActionsTree } from "pinia";
import ms from "ms";

import { setCookie, removeCookie, getUserFromCookie } from "@/helpers";
import { IUser } from "@/types";

export interface AuthenticationStoreState extends StateTree {
  users: Array<IUser>;
}

export interface AuthenticationStoreGetter
  extends GettersTree<AuthenticationStoreState> {}

export interface AuthenticationStoreAction extends ActionsTree {
  /**
   * Login user.
   * @description Check user credentials and set cookie.
   */
  login: (user: IUser) => void;
  /**
   * Logout current logged in user.
   * @description Remove the cookie
   */
  logout: () => void;
  /**
   * Register new user.
   * @description Add new user and set the cookie
   */
  register: (user: IUser) => void;
}

/**
 * `Authentication` store is used to manage users authentication.
 */
export const useAuthenticationStore = defineStore<
  string,
  AuthenticationStoreState,
  AuthenticationStoreGetter,
  AuthenticationStoreAction
>("authentication", {
  state() {
    return {
      users: [
        {
          name: "Asım Tahir",
          username: "asimtahir",
          password: "12345678",
        },
        {
          name: "Demo",
          username: "demo",
          password: "demo",
        },
      ],
    };
  },
  actions: {
    login(user: IUser) {
      const userFromCookie = getUserFromCookie("access_token");
      const _user = this.users.find(
        (u) => u.username === user.username && u.password === user.password
      );

      if (!userFromCookie && _user) {
        // login if cookie are not specified and user exists.
        setCookie("access_token", user, {
          expires: new Date(new Date().getTime() + ms("1w")),
        });
      }
    },
    logout() {
      removeCookie("access_token");
    },
    register(user: IUser) {
      const userFromCookie = getUserFromCookie("access_token");
      // check user is already registered or not.
      const _user = this.users.find(
        (u) => u.username === user.username && u.password === user.password
      );

      // check cookie is specified and user is not registered yet.
      if (!userFromCookie) {
        if (!_user) {
          this.users.push(user);

          // overwrite previous authentication with new registered user.
          setCookie("access_token", user, {
            expires: new Date(new Date().getTime() + ms("1w")),
          });
        } else {
          // if user is already registered, set the cookie.
          setCookie("access_token", _user, {
            expires: new Date(new Date().getTime() + ms("1w")),
          });
        }
      }
    },
  },
});
