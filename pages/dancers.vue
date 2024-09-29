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

// Get dancers list from API
async function fetchDancers() {
    try {
        if(!authStore.isAuthenticated) {
			     console.log('User not authenticated');
           return [];
		    }
        const { user: { email } } = authStore;
        return authStore.getDancersList(email);
    } catch (error) {
        console.error('erreur',error);
        return [];
    }
}

// Init dancers list
const dancers = ref([]);

// Get dancers list from API
onBeforeMount(async () => {
  dancers.value = await fetchDancers();
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