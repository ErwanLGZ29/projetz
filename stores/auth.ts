
import { defineStore } from 'pinia';
import { authService } from '~/services/authService';
import { AxiosError } from 'axios';

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
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    throw error.response?.data?.message || error;
                } else {
                    throw error;
                }
            }
        },
        async login(email: string, password: string) {
            try {
                const response = await authService.login(email, password);
                localStorage.setItem("current_user_token", response.data.token);
                localStorage.setItem("current_user", JSON.stringify(response.data.user));
                this.checkAuthentication();
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    throw error.response?.data?.message || error;
                } else {
                    throw error;
                }
            }
        },
        async update(email: string, username: string) {
            try {
                const token = process.client ? localStorage.getItem('current_user_token') || 'null' : 'null';
                const response = await authService.update(email, username, token);
                localStorage.setItem("current_user", JSON.stringify(response.data.user));
                this.checkAuthentication();
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    throw error.response?.data?.message || error;
                } else {
                    throw error;
                }
            }
        },

        async getDancersList(email: string) {
            try {
                const token = process.client ? localStorage.getItem('current_user_token') || 'null' : 'null';
                const response = await authService.getDancersList(email, token);
                return response.data.dancers;
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    throw error.response?.data?.message || error;
                } else {
                    throw error;
                }
            }
        },

        async deleteUser(email: string) {
            try {
                const token = localStorage.getItem('current_user_token') || 'null';
                const response = await authService.deleteUser(email, token);
                localStorage.removeItem("current_user");
                localStorage.removeItem("current_user_token");
                this.checkAuthentication();
            } catch (error) {
                if (error instanceof AxiosError && error.response) {
                    throw error.response?.data?.message || error;
                } else {
                    throw error;
                }
            }
        },


        logout() {
            if (process.client) {
                localStorage.removeItem("current_user_token");
                localStorage.removeItem("current_user");
            }
            this.isAuthenticated = false;
            this.user = null;
        },
        async checkAuthentication() {
            try {
                this.isAuthenticated = !!localStorage.getItem('current_user_token');
                this.user = JSON.parse(localStorage.getItem('current_user') || 'null');
            
                const token = localStorage.getItem('current_user_token') || 'null';
                if (this.isAuthenticated && token && this.user && this.user.email) {
                    await authService.checkToken(this.user.email, token);
                }else{
                    this.logout();
                }
            } catch (error) {
                this.logout();
            }
        }
    }
});
