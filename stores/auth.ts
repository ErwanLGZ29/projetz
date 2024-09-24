
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
                if (process.client) { // Vérifiez si nous sommes en mode client
                    localStorage.setItem("current_user_token", response.data.token);
                    localStorage.setItem("current_user", JSON.stringify(response.data.user));
                }
                this.isAuthenticated = true; // Mettez à jour l'état ici
                this.user = response.data.user; // Mettez à jour l'utilisateur
            } catch (error: any) {
                throw error.response?.data?.message || error;
            }
        },
        async update(email: string, username: string) {
            try {
                const token = process.client ? localStorage.getItem('current_user_token') || 'null' : 'null';
                const response = await authService.update(email, username, token);
                if (process.client) {
                    localStorage.setItem("current_user", JSON.stringify(response.data.user));
                }
            } catch (error: any) {
                throw error.response?.data?.message || error;
            }
        },
        logout() {
            if (process.client) { // Vérifiez si nous sommes en mode client
                localStorage.removeItem("current_user_token");
                localStorage.removeItem("current_user");
            }
            this.isAuthenticated = false;
            this.user = null;
        },
        async checkAuthentication() {
            // Vérifiez l'état d'authentification uniquement côté client
            if (process.client) {
                this.isAuthenticated = !!localStorage.getItem('current_user_token');
                this.user = JSON.parse(localStorage.getItem('current_user') || 'null');
                console.log('Auth state checked:', this.isAuthenticated);
            }
        }
    }
});
