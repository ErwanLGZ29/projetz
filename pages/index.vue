<template>
    <div class="container">
        <div class="desc-Panel">
            <h1>Le Break Dance</h1>
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

  
  <style scoped>
    .desc-Panel {
        width: 60%;
        margin: 0 auto;
        padding: 1rem;
    }

    .desc-Panel-Article {
        width: 100%;
        color: var(--second-text-color);;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        margin-top: 3rem;
    }

    .desc-Panel-Article img {
        width: 50%;
        height: auto;
        border-radius: 1rem;
    }
  </style>