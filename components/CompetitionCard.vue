<template>
    <div class="card-container">
        <div class="card-image-container">
            <img :src="imageSrc" :alt="imageAlt" class="card-image" />
        </div>
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


<style lang="scss" scoped>
.card-container {
    width: 100%;
    background-color: var(--second-background-color);
    color: var(--second-text-color);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border-radius: 1rem;
    box-shadow: 5px 5px 10px #00093c8c;

    .card-image-container {
        width: 100%;
        height: auto;
        overflow: hidden;
        border-radius: 1rem 1rem 0 0;

        img {
            width: 100%;
            height: auto;
            transition: 0.5s ease-in-out;
            transform: scale(1.03);

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .card-informations {
        width: 90%;
        height: auto;
        margin: 0;
        padding: 5%;

        p {
            margin: 0;
            padding: 0;
            text-align: left;
            font-size: 1.3rem;

            strong {
                color: var(--main-color);
            }
        }
    }
}
</style>