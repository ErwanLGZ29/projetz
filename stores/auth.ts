import { defineStore } from 'pinia';
import { authService } from '~/services/authService';

interface User {
    username: string;
    email: string;
    password: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        isAuthenticated: false,
    }),
    actions: {
        async register(username: string, email: string, password: string) {
            try {
                await authService.register(username, email, password);
            } catch (error: any) {
                throw error.response?.data?.message || error;
            }
        },
        async login(email: string, password: string) {
            try {
                const response = await authService.login(email, password);
                this.checkAuthentication();
            } catch (error: any) {
                throw error.response?.data?.message || error;
            }
        },
        async update(email: string, username: string) {
            try {
                const token = localStorage.getItem('current_user_token') || 'null';
                console.log('ici2', email, username, token);
                const response = await authService.update(email, username, token);
                this.checkAuthentication();
            } catch (error: any) {
                throw error.response?.data?.message || error;
            }
        },
        logout() {
            authService.logout();
            this.isAuthenticated = false;
            this.user = null;
        },
        checkAuthentication() {
            this.isAuthenticated = !!localStorage.getItem('current_user_token');
            this.user = JSON.parse(localStorage.getItem('current_user') || 'null');
        }
    }
});
