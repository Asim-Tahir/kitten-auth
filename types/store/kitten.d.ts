import { StateTree, GettersTree, ActionsTree } from "pinia/dist/pinia";

export interface IKitten {
  id: string;
  url: string;
  width: number;
  height: number;
  [key: string]: any;
}

export interface IKittenStoreState extends StateTree {
  data: IKitten | undefined;
}

export interface IKittenStoreGetter extends GettersTree<IKittenStoreState> {
  getKittenURL: (state: IKittenStoreState) => string | undefined;
}

export interface IKittenStoreAction extends ActionsTree {
  /**
   * Fetch new kitten.
   * @description Check user credentials and set cookie.
   */
  fetchKitten: () => Promise<void>;
}
