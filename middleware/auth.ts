// middleware/auth.ts

import { defineNuxtRouteMiddleware, navigateTo, useRouter } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const router = useRouter(); 

    // Vérifiez l'état d'authentification côté serveur ou côté client
    await authStore.checkAuthentication();

    const isAuthenticated = authStore.isAuthenticated;

    console.log(`Middleware called: ${to}, Authenticated: ${isAuthenticated}`);

    if (['login', 'register'].includes(to.name as string) && isAuthenticated) {
        console.log('Redirecting to profile');
        return navigateTo('/profile'); // Redirige vers le profil si connecté
    }

    if (to.name === 'profile' && !isAuthenticated) {
        console.log('Redirecting to login');
        return navigateTo('/login'); // Redirige vers login si déconnecté
    }
});
