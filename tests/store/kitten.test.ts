import { setActivePinia, createPinia } from "pinia";
import { setupTest, createContext } from "@nuxt/test-utils";

import { Context } from "@nuxt/types";
import { useKittenStore } from "@/store";
import { IKitten } from "@/types";

describe("Kitten Store", () => {
  const kittens: Array<IKitten> = [];
  setupTest({
    config: {
      modules: [
        // https://axios-http.com
        // https://go.nuxtjs.dev/axios
        "@nuxtjs/axios",

        // https://github.com/nuxt-community/proxy-module
        [
          "@nuxtjs/proxy",
          {
            "^/api/": {
              target:
                process.env.KITTEN_API_BASE_URL ||
                "https://api.thecatapi.com/v1",
              changeOrigin: true,
              autoRewrite: true,
            },
          },
        ],
      ],
      privateRuntimeConfig: {
        apiKey: "DEMO-API-KEY",
      },
      axios: {
        baseURL: "/api/",

        headers: {
          common: {
            "x-api-key": "DEMO-API-KEY",
          },
        },
      },
    },
  });

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test("should fetch a kitten", async () => {
    const store = useKittenStore();

    store.$nuxt = createContext({
      config: {
        modules: [
          // https://axios-http.com
          // https://go.nuxtjs.dev/axios
          "@nuxtjs/axios",

          // https://github.com/nuxt-community/proxy-module
          [
            "@nuxtjs/proxy",
            {
              "^/api/": {
                target:
                  process.env.KITTEN_API_BASE_URL ||
                  "https://api.thecatapi.com/v1",
                changeOrigin: true,
                autoRewrite: true,
              },
            },
          ],
        ],
        privateRuntimeConfig: {
          apiKey: "DEMO-API-KEY",
        },
        axios: {
          baseURL: "/api/",

          headers: {
            common: {
              "x-api-key": "DEMO-API-KEY",
            },
          },
        },
      },
    }) as unknown as Context;

    // store.$nuxt.$axios.$get = jest.fn().mockResolvedValue({
    //   data: {
    //     url: "https://cdn2.thecatapi.com/images/95g.jpg",
    //     id: "95g",
    //     width: 450,
    //     height: 331,
    //   },
    // });

    // store.data = {
    //   url: "https://api.thecatapi.com/v1/images/search",
    //   id: "123",
    //   width: 600,
    //   height: 300,
    // };

    const kitten = store.fetchKitten();

    await expect(kitten).resolves.not.toBeUndefined();
    // await expect(kitten).rejects.toBeUndefined();

    kittens.push(await kitten);
  });
});
