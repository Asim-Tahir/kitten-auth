import type { Configuration, NuxtConfig } from "@nuxt/types";
import type { VueViteOptions } from "vite-plugin-vue2";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "kittini 🐈 • Sadece Kediler",
    htmlAttrs: {
      lang: "tr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["animate.css/animate.min.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://typescript.nuxtjs.org/
    ["@nuxt/typescript-build", { typeCheck: false }],

    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",

    // https://tailwindcss.nuxtjs.org/
    "@nuxtjs/tailwindcss",

    // https://vite.nuxtjs.org/
    "nuxt-vite",

    // https://composition-api.nuxtjs.org
    "@nuxtjs/composition-api/module",

    // https://image.nuxtjs.org
    "@nuxt/image",

    // https://pinia.esm.dev/ssr/nuxt.html
    "@pinia/nuxt",

    // https://github.com/antfu/unplugin-vue2-script-setup
    ["unplugin-vue2-script-setup/nuxt", { refTransform: true }],

    // https://github.com/antfu/unplugin-auto-import
    [
      "unplugin-auto-import/nuxt",
      {
        imports: ["@nuxtjs/composition-api"],
        dts: "types/auto-imports.d.ts",
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://axios-http.com
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",

    // https://image.nuxtjs.org
    "@nuxt/image",

    // https://content.nuxtjs.org
    "@nuxt/content",

    // https://github.com/nuxt-community/proxy-module
    "@nuxtjs/proxy",
  ],

  vite: {
    build: true,
    plugins: [],
    // ssr: true // enable unstable server-side rendering for development (false by default)
    experimentWarning: false, // hide experimental warning message (disabled by default for tests)
    vue: {
      /* options for vite-plugin-vue2 */
    } as VueViteOptions,
  },

  privateRuntimeConfig: {
    apiKey: process.env.KITTEN_API_KEY || "DEMO-API-KEY",
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "/api",

    // headers: {
    //   get: {
    //     "x-api-key": process.env.KITTEN_API_KEY || "DEMO-API-KEY",
    //   },
    // },
  },

  proxy: {
    "/api": {
      target: process.env.KITTEN_API_BASE_URL || "https://api.thecatapi.com/v1",
      changeOrigin: true,
      autoRewrite: true,
      pathRewrite: (path: string) => path.replace(/^\/api/, ""),
    },
  },

  content: {},

  // Tailwind module configuration: https://tailwindcss.nuxtjs.org/options
  tailwindcss: {
    exposeConfig: true,
    config: {
      /* Extend the Tailwind config here */
      purge: {
        content: [
          `components/**/*.{vue,ts}`,
          `layouts/**/*.vue`,
          `pages/**/*.vue`,
          `plugins/**/*.{js,ts}`,
          `content/**/**.md`,
          `nuxt.config.ts`,
        ],
      },
    },
  },

  image: {
    // Generate images to `/_nuxt/image/file.png`
    staticFilename: "[publicPath]/images/[name]-[hash][ext]",
    dir: "static/images",
    domains: ["https://cdn2.thecatapi.com"],
    ipx: {
      domains: ["https://cdn2.thecatapi.com"],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: { "postcss-nested": {}, "postcss-nested-ancestors": {} },
    },
  },
} as NuxtConfig | Configuration;
