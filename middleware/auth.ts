// middleware/auth.ts

import { defineNuxtRouteMiddleware, navigateTo, useRouter } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const router = useRouter(); 

    // Check if the user is authenticated
    await authStore.checkAuthentication();

    const isAuthenticated = authStore.isAuthenticated;

    console.log(`Middleware called: ${to}, Authenticated: ${isAuthenticated}`);

    if (['login', 'register'].includes(to.name as string) && isAuthenticated) {
        console.log('Redirecting to profile');
        return navigateTo('/profile');
    }

    if (to.name === 'profile' && !isAuthenticated) {
        console.log('Redirecting to login');
        return navigateTo('/login');
    }
});
