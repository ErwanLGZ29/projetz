<template>
    <div class="card-container">
        <div v-if="alternative" class="card-description"><p>{{ formattedDescription }}</p></div>
        <img :src="imageSrc" :alt="imageAlt" class="card-image" />
        <div v-if="!alternative" class="card-description"><p>{{ formattedDescription }}</p></div>
    </div>
</template>

<script>
    export default {
        name: 'CardDesc',
        props: {
            imageSrc: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
                default: 'Card image'
            },
            description: {
                type: String,
                required: true
            },
            alternative: {
                type: Boolean,
                default: false
            }
        },
        computed: {
        formattedDescription() {
            return this.description.replace(/\r?\n|\r/g, " ");
        },
  },
    };
</script>


<style scoped>
    .card-container {
        width: 100%;
        background-color: var(--second-background-color);
        color: var(--second-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 7rem;

        border-radius: 1rem;
        box-shadow: 5px 5px 10px #00093c8c;
    }

    .card-container img {
        width: 50%;
        height: auto;
        border-radius: 1rem;
    }

    .card-description{
        width: 50%;
        height: auto;
        margin: 0;
        padding: 0;
    }

    .card-container p {
        font-size: 1.5rem;
        padding: 1rem;
        margin: 0;
    }

    @media screen and (max-width: 1300px) {
        .card-container p{
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 768px) {
        .card-container {
            flex-direction: column;
            margin-top: 4rem;
        }

        .card-container img, .card-description{
            width: 100%;
        }

        .card-description p{
            font-size: 0.8rem;
        }
    }
</style>