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
                    <h2 class="mb-4">I dati presenti su BDoctors sono tutelati e sicuri</h2>
                    <ul>
                        <li>I dati che inserisci rimangono di tua esclusiva proprietà</li>
                        <li>Tutte le tue informazioni personali sono cifrate e protette</li>
                        <li>BDoctors non condividerà né venderà le tue informazioni</li>
                    </ul>
                    <a class="btn btn-success mt-3 ms-3" href="https://www.garanteprivacy.it/il-testo-del-regolamento" role="button">informati</a>
                </div>
                <div class="flex-shrink-1">
                    <img src="https://platform.docplanner.com/img/general/ilustrations/privacy-website.svg" class="small-photo">
                </div>
            </div>

            <div class="ms-row d-flex py-5">
                <div>
                    <img src="https://platform.docplanner.com/img/general/ilustrations/privacy-owner.svg" class="big-photo">
                </div>
                <div class="align-self-center ms-3">
                    <h2>L'unico proprietario dei dati sei tu</h2>
                    <p class="mb-4">Nessuno può avere accesso ai dati inseriti da pazienti e medici</p>
                    <h4>Tutti i dati in BDoctors sono esclusivamente di chi li inserisce.</h4>
                    <h4>Le informazioni sono tue e ben protette.</h4>
                </div>
            </div>
        </div>
        
        <footer>
            <div>
                <p>© 2024 BDoctors. Tutti i diritti riservati. Le informazioni fornite su questo sito, comprese le prenotazioni delle visite mediche, i messaggi al medico e le recensioni, sono a scopo informativo e non sostituiscono il consiglio medico professionale.</p>
            </div>
        </footer>
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
    background-color: rgba(179, 255, 227, 0.587);
    border-radius: 40px;
    padding: 40px 20px;
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
        font-size: 39px;
    }
    ul{
        line-height: 40px;
    }
    a{
        color:$primary-color;
        background-color: $secondary-color;
        border: none;
    }
    a:hover {
        color: white;
        background-color: $primary-color;
    }
    .small-photo{
        width: 80%;
    }
    .big-photo{
        width: 600px;
    }
}

footer{
    text-align: center;
    margin: 0 auto;
    width: 700px;
    padding: 100px 0 10px 0;
    p{
        border-top: 2px solid rgba(255, 255, 255, 0.522);
    }
}
</style>