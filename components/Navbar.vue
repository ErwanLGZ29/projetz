<template>
    <nav :class="{ 'colored': isColored }">
        <div class="navigation-container">
            <a href="/"><img class="logo" src="/breakdance-picto.jpg" alt="logo" /></a>
            <NuxtLink to="/">L'histoire</NuxtLink>
            <NuxtLink to="/competitions">Les Compétitions</NuxtLink>
        </div>
        <div class="login-container">
            <NuxtLink v-if="authStore.isAuthenticated" to="/" class="profile-link">
                <img class="profile" src="/userprofile.png" alt="profile" />
                <p>{{ authStore.user.username }}</p>
            </NuxtLink>
            <NuxtLink v-if="!authStore.isAuthenticated" to="/login">Connexion</NuxtLink>
            <button class="logout" v-if="authStore.isAuthenticated" @click="logout">Déconnexion</button>
        </div>
    </nav>
</template>

<script>
import { useAuthStore } from '~/stores/auth';
import { authService } from '~/services/authService';

// Navbar component change the background color when scrolling down
export default {
    data() {
        return {
            isColored: false
        };
    },
    computed: {
        // Use the authStore in the template
        authStore() {
            return useAuthStore();
        }
    },
    // Add event listener on window when component is mounted to change
    // navbar background color when scrolling down.
    mounted() {
        this.authStore.checkAuthentication();
        window.addEventListener('scroll', this.handleScroll);
        this.checkRoute(this.$route.name);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        $route($to, $from) {
            this.checkRoute($to.name);
        }
    },
    methods: {
        handleScroll() {
            if (this.$route.name === 'index') {
                if (window.scrollY > 50) {
                    this.isColored = true;
                } else {
                    this.isColored = false;
                }
            } else {
                this.isColored = true;
            }
        },

        checkRoute(routeName) {
            if (routeName === 'index') {
                this.isColored = false;
            } else {
                this.isColored = true;
            }
        },

        logout() {
            this.authStore.logout();
            navigateTo('/'); // Redirection après déconnexion
        },
    }
};
</script>

<style lang="scss" scoped>
nav {
    width: 98%;
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    padding: 1%;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.5s ease-out;

    .navigation-container,
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .colored {
        background-image: -webkit-linear-gradient(to right, var(--main-color), var(--second-color));
        /* Chrome 10-25, Safari 5.1-6 */
        background-image: linear-gradient(to right, var(--main-color), var(--second-color));
        /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .logo {
        width: 3rem;
        height: 3rem;
        border-radius: 5rem;
    }

    a {
        font-size: 1.5rem;
        color: var(--main-text-color);
        text-decoration: none;
        text-shadow: 1px 1px 2px black;
        border: none;
        background: none;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .profile-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .profile {
            width: 2rem;
            height: 2rem;
        }

        p {
            margin: 0;
        }
    }

    .logout {
        font-size: 1rem;
        color: var(--main-text-color);
        border: 2px solid var(--main-text-color);
        border-radius: 1rem;
        padding: 0.3rem;
        background: none;
    }

    @media screen and (max-width: 768px) {

        .navigation-container,
        .login-container {
            gap: 1rem;
        }

        a {
            font-size: 1rem;
        }
    }
}
</style>