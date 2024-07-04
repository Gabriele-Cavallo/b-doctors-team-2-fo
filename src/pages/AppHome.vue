<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            specialisations: [],
        }
    },
    methods: {
        getAllSpecialisations (){
            axios.get(`${this.store.apiUrl}/api/specialisations`)
            .then((response) => {
                this.specialisations = response.data.results;
                this.loading = true;
            })
        },
        submitForm() {
            const form = document.getElementById('filterForm');
            const formData = new FormData(form);
            const params = new URLSearchParams();
            for (const pair of formData.entries()) {
                params.append(pair[0], pair[1]);
            }
            axios.get(`${this.store.apiUrl}/api/filter-results`, { params: params })
                .then((response) => {
                    window.location.href = response.data.url;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    },
    mounted () {
        this.getAllSpecialisations();
    }
}
</script>
<template>
    <div class="container-fluid custom-background">
        <div class="row justify-content-center align-items-start">
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center">
                <div class="blue-box">
                    <img src="https://imgur.com/GBXXplQ.jpg" alt="">
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center my-3">
                <div class="ms-scritte">
                    <h1 class="text-center text-white ms-mb">Benvenuto in BDoctors!</h1>
                    <h2 class="text-center text-white ms-mb-2">Qui troverai lo specialista che fa per te!</h2>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center">
                <div class="red-box">
                    <img src="https://imgur.com/P5b3i9X.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="search-bar container">
        <form class="d-flex gap-3 my-4 flex-wrap justify-content-center" id="filterForm" @submit.prevent="submitForm">
            <div v-for="specialisation in specialisations" :key="specialisation.id">
                <label class="btn btn-brand badge ms-badge" :for="`specialisation-${specialisation.id}`">{{ specialisation.name }}</label>
                <input type="checkbox" :name="`specialisation`" :id="`specialisation-${specialisation.id}`" :value="`${specialisation.slug}`">
                <!-- <router-link :to="{ name: 'single-specialisation', params: { slug: specialisation.slug } }" class="btn btn-brand badge ms-badge">{{ specialisation.name }}</router-link> -->
            </div>
            <div class="filter-wrapper my-3">
                <div class="rating-stars">
                    <input type="radio" name="rating" id="rs0" v-model="minRating" value="0" ><label for="rs0"></label>
                    <input type="radio" name="rating" id="rs1" v-model="minRating" value="1" @click="resetRating"><label for="rs1"></label>
                    <input type="radio" name="rating" id="rs2" v-model="minRating" value="2" @click="resetRating"><label for="rs2"></label>
                    <input type="radio" name="rating" id="rs3" v-model="minRating" value="3" @click="resetRating"><label for="rs3"></label>
                    <input type="radio" name="rating" id="rs4" v-model="minRating" value="4" @click="resetRating"><label for="rs4"></label>
                    <input type="radio" name="rating" id="rs5" v-model="minRating" value="5" @click="resetRating"><label for="rs5"></label>
                    <button @click="resetRating" class="btn btn-brand ms-3">Reset</button>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-brand">Cerca Medico</button>
        </form>
    </div>


    <footer>
        <div class="container">
            <p>© 2024 BDoctors. Tutti i diritti riservati. Le informazioni fornite su questo sito, comprese le prenotazioni delle visite mediche, i messaggi al medico e le recensioni, sono a scopo informativo e non sostituiscono il consiglio medico professionale.</p>
        </div>
        </footer>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.ms-mb {
    margin-top: 100px;
    margin-bottom: 50px;
}

.custom-background {
    background-color: #00c3a5;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.blue-box, .red-box {
    width: 100%;
    max-width: 400px;
    height: auto;
    overflow: hidden;

}

.blue-box img, .red-box img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.ms-scritte {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-top: 1rem;
}

.text-white {
    color: white;
}
.ms-badge{
    background-color: $primary-color;
}
.btn:hover{
    &.ms-badge{
        background-color: $secondary-color;
        color: $primary-color;
    }
}

footer{
    text-align: center;
    margin: 0 auto;
    width: 50%;
    padding: 100px 0 10px 0;
    p{
        border-top: 2px solid rgba(0, 0, 0, 0.522);
    }
}
</style>