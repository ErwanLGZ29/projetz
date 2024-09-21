<template>
    <div class="container">
        <div class="main-Panel">
            <img src="/background.jpg" className="background-image" alt="bg" />
            <h1>Le Break Dance</h1>
        </div>
        <div class="desc-Panel">

            <DescCard
                imageSrc="/hong10.png"
                imageAlt="hong10"
                description="Le breakdance, aussi appelé breaking est un style de danse développé à New York dans les années 1970,
                        caractérisé par ses mouvements de corps saccadés, son aspect acrobatique et ses figures au sol. Un danseur de breaking est appelé Bboy (pour un homme),
                        Bgirl (pour une femme)."
            />

            <DescCard
                imageSrc="/carlota.jpg"
                imageAlt="carlota"
                description="Bien qu’on pense qu'il est né aux États-Unis, des archives montrent qu'une forme de breaking était dansée en Afrique,
                plus exactement à Kaduna, au Nigéria, dans les années 19502."
                :alternative="true"
            />

            <DescCard
                imageSrc="/yuasa.jpg"
                imageAlt="yuasa"
                description="En France, la première apparition officielle du breaking remonte à la tournée New York City Rap organisée par Europe 1 en 1982.
                 En 1984, l'émission télévisée de Sydney, H.I.P. H.O.P. popularise la culture hip-hop en France;
                 le jury de l'émission était les P.C.B. (Paris City Breakers)."
            />
        </div>
    </div>
  </template>

<script>
import DescCard from './components/DescCard.vue';

export default {
  components: {
    DescCard
  }
}
</script>

  <style scoped>
  
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700');
    img{
        width: 100%;
        height: auto;
    }
    .main-Panel{
        width: 100%;
        height: auto;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    h1 {
        font-family: "Playfair Display", Georgia, serif;
        color: var(--main-text-color);
        font-size: 6rem;
        position: absolute;
        z-index: 2;
    }

    .desc-Panel {
        width: 60%;
        margin: 0 auto 10rem;
        padding: 1rem;
       
    }

    @media screen and (max-width: 1300px) {
        .desc-Panel {
            width: 80%;
        }
    }

    @media screen and (max-width: 768px) {

        h1 {
            font-size: 3rem;
        }
        .desc-Panel {
            width: 90%;
            margin: 0 auto 5rem;
        }
    }
  </style>