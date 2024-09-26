<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";
import { useHead } from '#app'

useHead({
  title: 'ProjetZ',
  meta: [
    { name: 'description', content: 'ProjetZ description' }
  ],
})

</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

:root {
  --main-color: #00093c;
  --second-color: #173e9c;
  --main-text-color: #ffffff;
  --second-text-color: #000000;
  --main-background-color: #eeeeee;
  --second-background-color: #ffffff;
}

body {
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: var(--second-text-color);
  background: var(--main-background-color);
  margin: 0;
}

.container {
  width: 100%;
  height: auto;
  text-align: center;
}

h1 {
  color: var(--main-color);
  font-size: 3rem;
}

p {
  font-size: 1.5rem;
}

.form-container {
  width: 100%;
  height: auto;
  background-color: var(--second-background-color);
  border-radius: 1rem;
}

form {
  width: 80%;
  height: auto;
  padding: 10%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-content: center;
  align-items: center;

  input {
    width: 94%;
    padding: 3%;
    height: 0.6rem;
    border-radius: 2rem;
    font-size: 1.2rem;
    border: 1px solid lightgrey;

    &:focus {
      outline: none;
      border: 1px solid var(--main-color);
    }
  }

  button {
    width: 50%;
    height: 3rem;
    border-radius: 2rem;
    background-color: var(--main-color);
    color: white;
    font-size: 1.5rem;
    border: 3px solid var(--main-color);

    &:hover {
      cursor: pointer;
      background-color: var(--second-color);
    }
  }
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

.error-message-container {
  height: 2rem;
}

.error-message {
  color: red;
  font-size: 1rem;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 2.4rem;
  }

  form input {
    height: 2rem;
    font-size: 1rem;
  }

  form button {
    width: 100%;
    height: 2.5rem;
  }
}
</style>
