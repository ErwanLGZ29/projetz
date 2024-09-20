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
        --main-color: #00093c;   /* Couleur principale */
        --second-color: #173e9c; /* Variante plus sombre */
        --main-text-color: #ffffff; /* Couleur de texte principale */
        --second-text-color: #000000; /* Couleur de texte secondaire */
        --main-background-color: #eeeeee; /* Couleur de fond principale */
        --second-background-color: #ffffff; /* Couleur de fond secondaire */
    }

    body {
        width: 100%;
        height: 100%;
        font-family: "Playfair Display", Georgia, serif;
        color: var(--second-text-color);
        background: var(--main-background-color);
        margin: 0; /* Ajout pour éviter les marges par défaut */
    }

    .container{
        width: 100%;
        height: auto;
        text-align: center;
    }

    p {
        font-size: 1.5rem;
    }

    /* Style scrollbar */
    body::-webkit-scrollbar {
      width: 5px;
      background: transparent;
    }

    body::-webkit-scrollbar-track {
      border-radius: 10px;
    }

    body::-webkit-scrollbar-thumb {
      background-color: var(--main-color);
      border-radius: 10px;
      border: 3px solid transparent;
    }
  </style>