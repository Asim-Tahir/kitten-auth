import { StateTree, GettersTree, ActionsTree } from "pinia/dist/pinia";

export interface IUser {
  username: string;
  password: string;
  name?: string;
}

export interface IAuthenticationStoreState extends StateTree {
  users: Array<IUser>;
}

export interface IAuthenticationStoreGetter
  extends GettersTree<IAuthenticationStoreState> {}

export interface IAuthenticationStoreAction extends ActionsTree {
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
