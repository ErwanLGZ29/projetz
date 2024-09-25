// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  ssr: true,
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: "2024-09-19",
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
