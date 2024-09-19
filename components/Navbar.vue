<template>
    <nav>
        <img class="logo" src="/breakdance-picto.jpg" alt="logo" />
      <NuxtLink to="/">Acceuil</NuxtLink>
      <NuxtLink to="/about">A propos</NuxtLink>
    </nav>
</template>

<style scoped>
    nav {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 10rem;
        background: linear-gradient(90deg, rgba(6,101,200,1) 0%, rgba(2,63,126,1) 50%, rgba(0,0,112,1) 100%);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    .logo{
        width: 5rem;
        height: 5rem;
        border-radius: 5rem;
    }

    a {
        font-size: 2rem;
        text-decoration: none;
        color: white;
        border: none;
        background: none;
        cursor: pointer;
    }

    a:hover {
    text-decoration: underline;
    }
</style>