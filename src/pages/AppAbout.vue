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
                    <p>Scambia messaggi con i tuoi medici in totale sicurezza</p>
                </div>
                <div class="ms-card">
                    <i class="fa-regular fa-envelope"></i>
                    <p>Scambia messaggi con i tuoi medici in totale sicurezza</p>
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
}
</style>