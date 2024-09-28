<template>
    <div class="container">
        <div class="login-container">
            <h1>Connexion</h1>
            <div class="form-container">
                <form @submit.prevent="login">
                    <input v-model="email" placeholder="Email" type="email" required />
                    <input v-model="password" placeholder="Mot de passe" type="password" required />
                    <button type="submit">Connexion</button>
                    <NuxtLink to="/register">Ou inscrivez-vous</NuxtLink>
                    <!-- error message -->
                    <div class="error-message-container">
                        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'Login Page',
    name: 'login',
    middleware: 'auth'
});
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const authStore = useAuthStore();
const showLoginToast = () => {
    toast.success("Connexion reussie !");
};

const login = async () => {
    errorMessage.value = null;
    try {
        // Call the login method from the auth service
        await authStore.login(email.value, password.value);
        errorMessage.value = null;
        // Redirect to the profile page
        navigateTo('/');
        showLoginToast();
    } catch (error) {
        // Display an error message
        errorMessage.value = error;
    }
};
</script>

<style lang="scss" scoped>
.login-container {
    width: 50%;
    height: auto;
    margin: 6rem auto;
    min-height: 71vh;
}

@media screen and (max-width: 768px) {
    .login-container {
        width: 80%;
    }
}
</style>