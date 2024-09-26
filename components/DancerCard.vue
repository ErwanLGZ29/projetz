<template>
    <div class="card-container">
        <div class="card-image-container">
            <img :src="dancer.image" alt="dancer.name" />
        </div>
        <div class="card-informations">
            <p class="name"><strong>{{ dancer.name }}</strong></p>
            <p><strong>Palmarès :</strong> </p>
            <p class="ranking">{{ dancer.ranking }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    dancer: {
        type: Object,
        required: true,
    },
});
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
        height: 70%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: black;
        border-radius: 1rem 1rem 0 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: 0.5s ease-in-out;
            transform: scale(1);

            &:hover {
                transform: scale(1.2);
            }
        }
    }

    .card-informations {
        width: 90%;
        height: 30%;
        margin: 0;
        padding: 5% 0 0 5%;

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

    @media screen and (max-width: 1300px) {

        .card-image-container { 
            height: 60%;
        }

        .card-informations {    
            height: 40%;
        }
        
    }

    @media screen and (max-width: 768px) {

        .card-image-container {
            height: 50%;
        }

        .card-informations {
            height: 50%;
        }
        
    }
}
</style>