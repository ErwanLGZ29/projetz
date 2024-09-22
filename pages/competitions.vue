<template>
  <div class="container">
    <div class="competition-container">
      <h1>Les Compétitions</h1>
      <div class="competition-cards">
        <CompetitionCard imageSrc="/bcone.jpg" imageAlt="RedBull BC One" competitionName="RedBull BC One"
          competitionPlace="Le lieu de la finale change chaque année." competitionDate="Novembre" />

        <CompetitionCard imageSrc="/boty.jpg" imageAlt="Battle of the Years (BOTY)"
          competitionName="Battle of the Years (BOTY)" competitionPlace="Montpellier, France."
          competitionDate="Octobre" />

        <CompetitionCard imageSrc="/silverback.jpg" imageAlt="Silverback Open Championships"
          competitionName="Silverback Open Championships" competitionPlace="Philadelphie, États-Unis."
          competitionDate="Octobre" />

        <CompetitionCard imageSrc="/undisputed.jpg" imageAlt="Undisputed" competitionName="Undisputed"
          competitionPlace="Le lieu de la finale change chaque année." competitionDate="Décembre" />

        <CompetitionCard imageSrc="/ibe.jpg" imageAlt="IBE (The Notorious IBE)"
          competitionName="IBE (The Notorious IBE)" competitionPlace="Heerlen, Pays-Bas." competitionDate="Aout" />

        <CompetitionCard imageSrc="/freestylesession.jpg" imageAlt="Freestyle Session"
          competitionName="Freestyle Session" competitionPlace="Los Angeles, États-Unis." competitionDate="Novembre" />
      </div>
    </div>
  </div>
</template>

<script>
import CompetitionCard from './components/CompetitionCard.vue';

export default {
  components: {
    CompetitionCard
  }
}
</script>

<style scoped>

.competition-container {
  width: 80%;
  height: auto;
  margin: 6rem auto;
}

.competition-cards {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}

@media screen and (max-width: 1300px) {
  h1 {
    font-size: 5rem;
  }

  .competition-cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 768px) {
  .competition-cards {
    grid-template-columns: 1fr;
  }
}
</style>