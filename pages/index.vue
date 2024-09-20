<template>
    <div class="container">
        <div class="main-Panel">
            <img src='/background.jpg' className="background-image" alt="bg" />
            <h1>Le Break Dance</h1>
        </div>
        <div class="desc-Panel">
            <div className='desc-Panel-Article'>
                <img src='/hong10.png' className="desc-image" alt="hong10" />
                <p>Le breakdance, aussi appelé breaking est un style de danse développé à New York dans les années 1970,
                caractérisé par ses mouvements de corps saccadés, son aspect acrobatique et ses figures au sol. Un danseur de breaking est appelé Bboy (pour un homme),
                Bgirl (pour une femme).</p>
            </div>

            <div className='desc-Panel-Article'>
                <p>Bien qu’on pense qu'il est né aux États-Unis, des archives montrent qu'une forme de breaking était dansée en Afrique,
                plus exactement à Kaduna, au Nigéria, dans les années 19502.</p>
                <img src='/carlota.jpg' className="desc-image" alt="carlota" />
            </div>  

            <div className='desc-Panel-Article'>
                <img src='/yuasa.jpg' className="desc-image" alt="yuasa" />
                <p>En France, la première apparition officielle du breaking remonte à la tournée New York City Rap organisée par Europe 1 en 1982.
                 En 1984, l'émission télévisée de Sydney, H.I.P. H.O.P. popularise la culture hip-hop en France;
                 le jury de l'émission était les P.C.B. (Paris City Breakers).</p>
            </div>  
        </div>
    </div>
  </template>

  
  <style>
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700');
    .main-Panel{
        width: 100%;
        height: auto;
        background-color: black;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .background-image{
        width: 100%;
        height: auto;
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

    .desc-Panel-Article {
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

    .desc-Panel-Article img {
        width: 50%;
        height: auto;
        border-radius: 1rem;
    }

    .desc-Panel-Article p {
        width: 50%;
        height: auto;
        padding: 2rem;
        font-size: 1.5rem;
    }

    @media screen and (max-width: 1300px) {
        .desc-Panel {
            width: 80%;
        }
    }

    @media screen and (max-width: 650px) {

        h1 {
            font-size: 3rem;
        }
        .desc-Panel {
            width: 90%;
        }

        .desc-Panel-Article {
            flex-direction: column;
            margin-top: 4rem;
        }

        .desc-Panel-Article img, .desc-Panel-Article p{
            width: 100%;
            font-size: 1rem;
        }
    }
  </style>