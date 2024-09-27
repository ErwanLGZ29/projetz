import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { authService } from './../services/authService'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Injecter le authService avec l'API_URL configurée
  authService.setApiUrl(config.public.API_URL)
})