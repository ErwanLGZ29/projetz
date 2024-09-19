<template>
    <div>
      <Navbar />
      <slot />
    </div>
  </template>
  
  <script setup>
    import Navbar from '~/components/Navbar.vue'
  </script>

  <style>
    @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700');


    :root {
        --main-color: #00162b;   /* Couleur principale */
        --dark-main-color: #000a12; /* Variante plus sombre */
        --main-text-color: #ffffff; /* Couleur de texte principale */
        --second-text-color: #000000; /* Couleur de texte secondaire */
    }

    body {
        width: 100%;
        height: 100%;
        font-family: "Playfair Display", Georgia, serif;
        color: var(--second-text-color);
        margin: 0; /* Ajout pour éviter les marges par défaut */
    }

    .container{
        margin-top: 10rem;
        width: 100%;
        height: auto;
        text-align: center;
    }

    h1 {
        color: var(--main-color);
        font-size: 4rem;
    }

    p {
        font-size: 1.5rem;
    }
  </style>