<template>
        <div class="footer-container">
            <div class="github-container">
                <img class="github-logo" src="/github.jpg" alt="github" />
                <a href="https://github.com/ErwanLGZ29/projetz" target="_blank">https://github.com/ErwanLGZ29/projetz</a>
            </div>
            <p>© 2024 ProjetZ. Tous droits réservés.</p>
        </div>
</template>

<style scoped>
    .footer-container {
        width: 98%;
        height: auto;
        margin: auto;
        padding: 1%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: var(--main-color);
    }

    .github-container {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .github-container a,  .footer-container p {
        margin: 0;
        padding: 0;
        color: var(--main-text-color);
        font-size: 1.2rem;
    }

    .github-logo {
        width: 2rem;
        height: 2rem;
        border-radius: 2rem;
    }

    @media screen and (max-width: 768px) {
        .github-container a,  .footer-container p {
            font-size: 1rem;
        }
    }
</style>