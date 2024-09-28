// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  head: {
    title: 'ProjetZ',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'ProjetZ description' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' } // Pour un favicon.ico
    ]
  },
  build: { transpile: ['vue-toastification'] },
  modules: ["@pinia/nuxt"],
  ssr: true,
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:5000/api', // Valeur par défaut si non définie dans .env
    }
  },
  plugins: ['~/plugins/vue-toastification.client.ts'],
  vite: {
    optimizeDeps: {
      include: ['vue-toastification']
    },
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
