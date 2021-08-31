import type { NuxtConfig } from "@nuxt/types";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Kitten Authentication",
    htmlAttrs: {
      lang: "tr",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    // "@nuxt/typescript-build",
    ["@nuxt/typescript-build", { typeCheck: false }],

    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",

    // https://go.nuxtjs.dev/tailwindcss
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
  vite: {
    /* options for vite */
    build: true,
    // ssr: true // enable unstable server-side rendering for development (false by default)
    experimentWarning: false, // hide experimental warning message (disabled by default for tests)
    vue: {
      /* options for vite-plugin-vue2 */
    },
  },

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
    [
      "@nuxtjs/proxy",
      {
        "^/api/": {
          target: process.env.VITE_THECAT_API_URL,
          changeOrigin: true,
          autoRewrite: true,
        },
      },
    ],

    // https://google-fonts.nuxtjs.org/
    "@nuxtjs/google-fonts",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

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

  googleFonts: {
    families: {
      Raleway: [200, 300, 400, 500, 600, 700, 800, 900],
    },
    display: "swap",
    subsets: ["latin-ext"],
    useStylesheet: false,
  },

  image: {
    // Generate images to `/_nuxt/image/file.png`
    staticFilename: "[publicPath]/images/[name]-[hash][ext]",
    dir: "assets/images",
    imgix: {
      baseURL: "https://assets.imgix.net",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: { "postcss-nested": {}, "postcss-nested-ancestors": {} },
    },
  },
} as NuxtConfig;
