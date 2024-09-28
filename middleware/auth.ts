// middleware/auth.ts

import { defineNuxtRouteMiddleware, navigateTo, useRouter } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';


export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const router = useRouter(); 

    // Check if the user is authenticated
    await authStore.checkAuthentication();

    const isAuthenticated = authStore.isAuthenticated;

    if (['login', 'register'].includes(to.name as string) && isAuthenticated) {

        return navigateTo('/profile');
    }

    if (['profile', 'dancers'].includes(to.name as string) && !isAuthenticated) {
        return navigateTo('/login');
    }
});
