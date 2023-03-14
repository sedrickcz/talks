// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        "data-theme": "synthwave",
      },
    },
  },
  modules: ["@nuxtjs/strapi", "@pinia/nuxt", "@nuxtjs/tailwindcss"],
  typescript: {
    shim: false,
  },
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
});
