<template>
    <div class="card-container">
        <img :src="imageSrc" :alt="imageAlt" class="card-image" />
        <div class="card-informations">
            <p class="name"><strong>{{ competitionName }}</strong></p>
            <p class="place"><strong>Lieu :</strong> {{ competitionPlace }}</p>
            <p class="date"><strong>Période :</strong> {{ competitionDate }}</p>
        </div>
    </div>
</template>


<script>
    //Competition card component 
    export default {
        name: 'CompetitionCard',
        props: {
            imageSrc: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
                default: 'Competition image'
            },
            competitionName: {
                type: String,
                required: true
            },
            competitionPlace: {
                type: String,
                required: true
            },
            competitionDate: {
                type: String,
                required: true
            }
        },
    };
</script>


<style scoped>
    .card-container {
        width: 100%;
        background-color: var(--second-background-color);
        color: var(--second-text-color);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        border-radius: 1rem;
        box-shadow: 5px 5px 10px #00093c8c;
    }

    .card-container img {
        width: 100%;
        height: auto;
        border-radius: 1rem  1rem 0rem 0rem;
    }

    .card-informations{
        width: 90%;
        height: auto;
        margin: 0;
        padding: 5%;
    }

    .card-informations p {
        margin: 0;
        padding: 0;
        text-align: left;
        font-size: 1.3rem;
    }

    .card-informations p strong {
        color: var(--main-color);
    }

</style>