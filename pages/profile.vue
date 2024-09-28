<template>
        <div class="container">
            <div class="profile-container">
                <h1>Profile</h1>
                <div class="form-container">
                    <img src="/userprofile.png" alt="profile" class="profile"/>
                    <form @submit.prevent="update">
                        <label for="username"><strong>Email</strong></label>
                        <input v-model="email" placeholder="Email" class="readonly" readonly />
                        <label for="username"><strong>Username</strong></label>
                        <input v-model="username" placeholder="Username" required />
                        <!-- <label for="password">Mot de passe</label>
                        <input v-model="password" placeholder="Mot de passe" type="password" /> -->
                        <button type="submit">Modifier le Profile</button>
                        <!-- error message -->
                        <div class="error-message-container">
                            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                        </div>
                    </form>
                </div>
                <button class="delete-button" @click="confirmDeleteAccount">Supprimer mon compte</button>
            </div>
        </div>
</template>

<script setup>
definePageMeta({
    title: 'Profile Page',
    name: 'profile',
    middleware: 'auth'
});
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toastification';

const authStore = useAuthStore();
const email = ref("");
const username = ref("");
const errorMessage = ref('')
// const password = ref("");

    const showUpdateToast = () => {
        useToast().success("Modification reussie !");
    };
    const showDeleteToast = () => {
        useToast().info("Compte supprimé !");
    };

email.value = authStore.user.email || "";
username.value = authStore.user.username || "";

const update = async () => {
            errorMessage.value = null;
            try {
                // Call the update method from the auth service
                await authStore.update(email.value, username.value);
                errorMessage.value = null;
                showUpdateToast();
            } catch (error) {
                // Display an error message
                errorMessage.value = error;
            }
        };

const confirmDeleteAccount = () => {
    if (confirm("Vous etes sûr de vouloir supprimer votre compte ?")) {
        deleteUser();
    }else{
        // Do nothing
    }
}

const deleteUser = async () => {
    errorMessage.value = null;
    try {
        // Call the delete method from the auth service
        await authStore.deleteUser(email.value);
        errorMessage.value = null;
        navigateTo('/');
        showDeleteToast();
    } catch (error) {
        // Display an error message
        errorMessage.value = error;
    }
}
</script>

<style lang="scss" scoped>
.profile-container {
    width: 50%;
    height: auto;
    margin: 6rem auto;
    min-height: 71vh;
}

.profile{
    width: 15%;
    height: auto;
    margin: 2rem auto 0;
    border-radius: 5rem;
    background-color: var(--main-color);
}

label {
    width: 100%;
    text-align: left;
    font-size: 1.2rem;
    padding: 0;
    margin: 0;
    color: var(--main-color);
}

.readonly {
    background-color: var(--main-background-color);
    opacity: 0.8;
    cursor: not-allowed;
    pointer-events: none;
}

.delete-button {
    margin-top: 2rem;
    width: 30%;
    height: 3rem;
    border-radius: 2rem;
    background-color: red;
    color: var(--main-text-color);
    font-size: 1.2rem;
    font-weight: bold;
    border: none;
    cursor: pointer;
}

@media screen and (max-width: 1300px) {
    .delete-button {
        width: 50%;
    }
    
}

@media screen and (max-width: 768px) {
    .profile-container {
        width: 80%;
    }

    .delete-button {
        width: 80%;
    }
}
</style>