<template>
    <div class="container">
        <div class="create-container">
            <h1>Créer un compte</h1>
            <div class="form-container">
                <form @submit.prevent="register">
                    <input v-model="username" placeholder="Username" required />
                    <input v-model="email" placeholder="Email" type="email" required />
                    <input v-model="password" placeholder="Mot de passe" type="password" required />
                    <button type="submit">S'inscrire</button>
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
import { useAuthStore } from "~/stores/auth";

const username = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const authStore = useAuthStore();

const register = async () => {
    errorMessage.value = null;
    try {
        // Call the register method from the auth service
        await authStore.register(username.value, email.value, password.value);

        errorMessage.value = null;
        // Redirect to the login page
        navigateTo("/login");
    } catch (error) {
        // Display an error message
        errorMessage.value = error;
    }
};
</script>

<style lang="scss" scoped>
.create-container {
    width: 50%;
    height: auto;
    margin: 6rem auto;
    min-height: 71vh;
}

@media screen and (max-width: 768px) {
    .create-container {
        width: 80%;
    }
}
</style>
