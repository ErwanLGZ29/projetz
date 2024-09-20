<template>
    <div class="cart-Desc">
        <img :src="imageSrc" :alt="imageAlt" class="card-image" />
        <p>{{ description }}</p>
    </div>
  </template>

<script>
    export default {
        name: 'cardDesc',
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
            }
        }
    }
</script>


<style scoped>
    .cart-Desc {
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

    .cart-Desc img {
        width: 50%;
        height: auto;
        border-radius: 1rem;
    }

    .cart-Desc p {
        width: 50%;
        height: auto;
        padding: 2rem;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        .cart-Desc {
            flex-direction: column;
            margin-top: 4rem;
        }

        .cart-Desc img, .cart-Desc p{
            width: 100%;
            font-size: 1rem;
        }
    }
</style>