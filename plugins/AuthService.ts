import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { authService } from './../services/authService'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  // Inject AuthService with API URL
  authService.setApiUrl(config.public.API_URL)
})