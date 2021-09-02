import { defineStore } from "pinia";

import {
  IKittenStoreState,
  IKittenStoreGetter,
  IKittenStoreAction,
  IKitten,
} from "@/types";

export default defineStore<
  string,
  IKittenStoreState,
  IKittenStoreGetter,
  IKittenStoreAction
>("kitten", {
  state: () => {
    return { data: undefined };
  },
  getters: {
    getKittenURL: (state) =>
      state.data
        ? state.data.url
        : "https://cdn2.thecatapi.com/images/rFd5zyn0U.jpg",
  },
  actions: {
    fetchKitten() {
      return new Promise((resolve, reject) => {
        this.$nuxt.$axios
          .$get<Array<IKitten>>("/images/search")
          .then((res) => {
            this.data = res[0];
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
