<template >
    <div class="container">
        <div class="dancers-container">
            <h1>Les danseurs</h1>
            <div class="dancers-cards">
                <DancerCard v-for="dancer in dancers" :key="dancer.id" :dancer="dancer" />
            </div>
        </div>
    </div>
</template>

    <script setup>
import { ref, onBeforeMount } from 'vue';
import DancerCard from '~/components/DancerCard.vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// Simuler la récupération de danseurs côté serveur
async function fetchDancers() {
    try {
        if(authStore.isAuthenticated) {
            const user = authStore.user;
            return await authStore.getDancersList(user.email);
        }else{
            console.log('User not authenticated');
            return [];
        }
    } catch (error) {
        console.error('erreur',error);
        return [];
    }
}

// Initialiser la liste des danseurs
const dancers = ref([]);

// Récupérer les danseurs lors du rendu côté serveur ou client
onBeforeMount(async () => {
  dancers.value = await fetchDancers();
  console.log('ici', dancers.value);
});

definePageMeta({
  title: 'Danseurs',
  middleware: 'auth',
});
</script>

<style lang="scss" scoped>
.dancers-container {
  width: 80%;
  height: auto;
  margin: 6rem auto;

  .dancers-cards {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 60vh 60vh 60vh;
    gap: 2rem;

    @media screen and (max-width: 1300px) {
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
}
</style>