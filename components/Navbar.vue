<template>
    <nav :class="{ 'colored': isColored }">
        <div class="navigation-container">
            <a href="/"><img class="logo" src="/breakdance-picto.jpg" alt="logo" /></a>
            <!-- Hamburger menu button (only visible on mobile) -->
            <button class="hamburger" @click="toggleMenu" v-if="isMobile">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </button>
            <!-- Desktop Menu -->
            <div class="nav-links" :class="{ 'open': isMenuOpen }">
                <div class="navigation-links-container">
                    <NuxtLink to="/">L'histoire</NuxtLink>
                    <NuxtLink to="/competitions">Les Compétitions</NuxtLink>
                    <NuxtLink to="/dancers">Les Danseurs</NuxtLink>
                </div>
                <div class="navigation-user-container">
                    <NuxtLink v-if="authStore.isAuthenticated" to="/profile" class="profile-link">
                        <img class="profile" src="/userprofile.png" alt="profile" />
                        <p>{{ authStore.user.username }}</p>
                    </NuxtLink>
                    <NuxtLink v-if="!authStore.isAuthenticated" to="/login">Connexion</NuxtLink>
                    <button class="logout" v-if="authStore.isAuthenticated" @click="logout">Déconnexion</button>
                </div>
            </div>

        </div>

    </nav>
</template>

<script>
import { useAuthStore } from '~/stores/auth';
import { useToast } from 'vue-toastification';

const toast = useToast();
const showLogoutToast = () => {
    toast.info("Déconnexion reussie !");
};

export default {
    data() {
        return {
            isColored: false,
            isMenuOpen: false,
            isMobile: false
        };
    },
    computed: {
        authStore() {
            return useAuthStore();
        }
    },
    mounted() {
        //check route here
        this.handleScroll(this.$route.name);

        this.checkWindowSize();
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('resize', this.checkWindowSize);
        this.authStore.checkAuthentication();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.checkWindowSize);
    },
    watch: {
        $route($to, $from) {
            this.handleScroll($to.name);
        }
    },
    methods: {
        handleScroll(pageName) {
            if (typeof pageName !== 'string') pageName = this.$route.name;
            if (pageName === 'index') {
                // Check if the user has scrolled to the top
                this.isColored = window.scrollY > 50;
            } else {
                this.isColored = true;
            }
            if (this.isMobile && this.isMenuOpen) {
                this.isMenuOpen = false;
            }
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        checkWindowSize() {
            this.isMobile = window.innerWidth <= 768;
            if (!this.isMobile) {
                this.isMenuOpen = false;
            }
        },
        logout() {
            this.authStore.logout();
            this.$router.push('/');
            showLogoutToast();
        }

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

    &.colored {
        background-image: linear-gradient(to right, var(--main-color), var(--second-color));
    }

    .navigation-container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 2rem;

        .logo {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
        }

        .hamburger {
            display: none;
            /* Caché par défaut */

            @media screen and (max-width: 768px) {
                display: flex;
                flex-direction: column;
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.5rem;

                .line {
                    width: 25px;
                    height: 3px;
                    background-color: var(--main-text-color);
                    margin: 2px 0;
                }
            }
        }

        .nav-links {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;

            .navigation-links-container {
                display: flex;
                gap: 2rem;

            }


            a {
                font-size: 1.5rem;
                color: var(--main-text-color);
                text-decoration: none;
                text-shadow: 1px 1px 2px black;
                transition: all 0.3s ease;

                &:hover {
                    text-decoration: underline;
                }
            }

            @media screen and (max-width: 768px) {
                display: none;
                /* Masqué sur mobile par défaut */
                position: absolute;
                width: 60%;
                top: 60px;
                right: 10px;
                flex-direction: column;
                background-color: rgba(0, 0, 0, 0.8);
                padding: 1rem;
                border-radius: 8px;

                .navigation-links-container {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                &.open {
                    display: flex;
                    /* Afficher quand isMenuOpen est true */
                }

                a {
                    font-size: 1.2rem;
                    padding: 0.5rem 0;
                }
            }
        }
    }

    .navigation-user-container {
        display: flex;
        align-items: center;
        gap: 1rem;

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
    }
}
</style>