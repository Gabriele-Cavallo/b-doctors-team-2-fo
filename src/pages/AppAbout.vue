<script>
export default {
    name: 'AppAbout'
}
</script>

<template>
    <section>
        <div class="container">
            <div class="slogan">
                <h2>Sentiti bene con BDoctors</h2>
            </div>
            <div class="d-flex justify-content-between ms-row">
                <div class="ms-card">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>Prenota visite online in modo facile e veloce, per te e i tuoi familiari</p>
                </div>
                <div class="ms-card">
                    <i class="fa-solid fa-heart-pulse"></i>
                    <p>Trova lo specialista che fa per te e prenota la prima disponibilità</p>
                </div>
                <div class="ms-card">
                    <i class="fa-regular fa-envelope"></i>
                    <p>Scambia messaggi con i tuoi specialisti in totale sicurezza</p>
                </div>
            </div>

            <div class="ms-row d-flex py-5">
                <div class="w-100 align-self-center">
                    <h2 class="mb-4">Tutti i dati che trovi su BDoctors sono protetti e sicuri</h2>
                    <ul>
                        <li>Tutti i dati che inserisci sono esclusivamente tuoi</li>
                        <li>Tutte le informazioni che ti appartengono sono criptate e protette</li>
                        <li>BDoctors non condividerà e non venderà i tuoi dati</li>
                    </ul>
                </div>
                <div class="flex-shrink-1">
                    <img src="https://platform.docplanner.com/img/general/ilustrations/privacy-website.svg" class="small-photo">
                </div>
            </div>

            <div class="ms-row d-flex py-5">
                <div class="flex-shrink-1">
                    <img src="https://platform.docplanner.com/img/general/ilustrations/privacy-website.svg">
                </div>
                <div class="w-100 align-self-center ms-5">
                    <h2>L'unico proprietario dei dati sei tu</h2>
                    <p class="mb-4">Nessuno può avere accesso ai dati inseriti da pazienti e medici</p>
                    <h4>Tutti i dati in BDoctors sono esclusivamente di chi li inserisce.</h4>
                    <h4>Le informazioni sono tue e ben protette.</h4>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;


section{
    color: white;
    background-color: $primary-color;
}

h1{
    color: $primary-color;
}

.slogan{
    padding-top: 50px;
    h2{
        text-align: center;
    }
}

.ms-row{
    margin-top: 50px;
    .ms-card{
        width: calc(100% / 3);
        margin: 0 30px;
        text-align: center;
        i{
            font-size: 80px;
            margin-bottom: 20px;
        }
    }
    h2{
        font-size: 40px;
    }
    ul{
        line-height: 40px;
    }
    .small-photo{
        width: 80%;
    }
}
</style>