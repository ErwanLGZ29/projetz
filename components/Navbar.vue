<template>
    <nav :class="{'colored': isColored}">
        <div class="navigation-container">
            <a href="/"><img class="logo" src="/breakdance-picto.jpg" alt="logo" /></a>
            <NuxtLink to="/">L'histoire</NuxtLink>
            <NuxtLink to="/competitions">Les Compétitions</NuxtLink>
        </div>
        <div class="login-container">
            <NuxtLink to="/">Connexion</NuxtLink>
        </div>
    </nav>
</template>

<script>
    // Navbar component change the background color when scrolling down
    export default {
        data() {
            return {
            isColored: false
            };
        },
        // Add event listener on window when component is mounted to change
        // navbar background color when scrolling down.
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        },
        watch: {
            $route($to, $from) {
                this.checkRoute();
            }
        },
        methods: {
            handleScroll() {
                if(this.$route.name == 'index') {
                    if (window.scrollY > 50) {
                        this.isColored = true;
                    } else {
                        this.isColored = false;
                    }
                }else{
                    this.isColored = true;
                }
            },

            checkRoute() {
                if(this.$route.name === 'index') {
                    this.isColored = true;
                }else{
                    this.isColored = false;
                }
            }
        }
    };
</script>

<style scoped>
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
        transition: all .5s ease-out;  
    }

    .navigation-container, .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .colored{
        background-image: -webkit-linear-gradient(to right, var(--main-color), var(--second-color));  /* Chrome 10-25, Safari 5.1-6 */
        background-image: linear-gradient(to right, var(--main-color), var(--second-color)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    }

    .logo{
        width: 3rem;
        height: 3rem;
        border-radius: 5rem;
    }

    a { 
        font-family: "Playfair Display", Georgia, serif;
        font-size: 1.5rem;
        color: var(--main-text-color);
        text-decoration: none;
        text-shadow: 1px 1px 2px black;
        border: none;
        background: none;
        cursor: pointer;
    }

    a:hover {
        text-decoration: underline;
    }

    @media screen and (max-width: 768px) {

        .navigation-container, .login-container{
            gap: 1rem;
        }

        a {
            font-size: 1rem;
        }
    }
</style>