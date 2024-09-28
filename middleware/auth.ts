// middleware/auth.ts

import { defineNuxtRouteMiddleware, navigateTo, useRouter } from 'nuxt/app';
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toastification';

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    const router = useRouter(); 

    const toast = useToast();
    const showRedirectToast = () => {
        toast.info("Vous devez être connecté pour accéder à cette page !");
    };

    // Check if the user is authenticated
    await authStore.checkAuthentication();

    const isAuthenticated = authStore.isAuthenticated;

    if (['login', 'register'].includes(to.name as string) && isAuthenticated) {

        return navigateTo('/profile');
    }

    if (['profile', 'dancers'].includes(to.name as string) && !isAuthenticated) {
        showRedirectToast();
        return navigateTo('/login');
    }
});
