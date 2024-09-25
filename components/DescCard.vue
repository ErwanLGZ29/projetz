<template>
    <div class="card-container">
        <div v-if="alternative" class="card-description">
            <p>{{ formattedDescription }}</p>
        </div>
        <div class="card-image-container" :class="{ 'alternative': alternative }">
            <img :src="imageSrc" :alt="imageAlt" />
        </div>
        <div v-if="!alternative" class="card-description">
            <p>{{ formattedDescription }}</p>
        </div>
    </div>
</template>


<script>
//Description card component 
export default {
    name: 'DescCard',
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
        //Description card with line breaks removed
        formattedDescription() {
            return this.description.replace(/\r?\n|\r/g, " ");
        },
    },
};
</script>


<style lang="scss" scoped>
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

    .card-image-container {
        width: 50%;
        height: auto;
        border-radius: 1rem 0 0 1rem;
        overflow: hidden;

        &.alternative {
            border-radius: 0 1rem 1rem 0;
        }

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

    .card-description {
        width: 50%;
        height: auto;
        margin: 0;
        padding: 0;

        p {
            font-size: 1.5rem;
            padding: 1rem;
            margin: 0;
        }
    }

    @media screen and (max-width: 1300px) {
        .card-description p {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-top: 4rem;

        .card-image-container,
        .card-description {
            width: 100%;
        }

        .card-description p {
            font-size: 0.8rem;
        }

        .card-image-container {
            border-radius: 1rem 1rem 0 0;
        }

        &.alternative {
            border-radius: 0 0 1rem 1rem;
        }
    }
}
</style>