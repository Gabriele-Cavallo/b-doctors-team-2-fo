<script>
import axios from 'axios';
import { store } from '../store.js';
import AppCarousel from '../components/AppCarousel.vue';

export default {
    name: 'AppHome',
    components: {
        AppCarousel
    },
    data() {
        return {
            store,
            specialisations: [],
            minRating: 0,
            starRating: [false, false, false, false, false]
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
        },
        resetRating() {
            this.minRating = 0;
        },
        setRating(rating) {
            this.minRating = rating;
            this.highlightStars(rating);
        },
        rate(index) {
        for (let i = 0; i <= index; i++) {
            this.$set(this.starRating, i, true);
        }
        for (let i = index + 1; i < this.starRating.length; i++) {
            this.$set(this.starRating, i, false);
        }
    },
    },
    mounted () {
        this.getAllSpecialisations();
    },
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

    <div class="container mt-5">
        <h2 class="text-center mb-3 title-sponsor">I dottori in evidenza:</h2>
        <div class="d-flex justify-content-center mb-5">
            <AppCarousel></AppCarousel>
        </div>
    </div>

    <div class="search-bar container">
        <form class="d-flex gap-3 my-4 flex-wrap justify-content-center" id="filterForm" @submit.prevent="submitForm">
            <div v-for="specialisation in specialisations" :key="specialisation.id">
                <label class="btn btn-brand badge ms-badge" :for="`specialisation-${specialisation.id}`">{{ specialisation.name }}</label>
                <input type="checkbox" class="hide" :name="`specialisation`" :id="`specialisation-${specialisation.id}`" :value="`${specialisation.slug}`">
                <!-- <router-link :to="{ name: 'single-specialisation', params: { slug: specialisation.slug } }" class="btn btn-brand badge ms-badge">{{ specialisation.name }}</router-link> -->
            </div>
            <div class="star-rating d-flex justify-content-center mt-5">
    <label v-for="(checked, index) in starRating" :key="index" :for="`star-${index + 1}`" class="star" @click="rate(index)">
        <i :class="{'fas fa-star': checked, 'far fa-star': !checked}"></i>
        <input type="radio" :id="`star-${index + 1}`" :value="index + 1" v-model="starRating[index]" class="hide">
    </label>
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

.hide {
    display: none;
}

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

.ms-badge {
    background-color: $primary-color;
}

.btn:hover {
    &.ms-badge {
        background-color: $secondary-color;
        color: $primary-color;
    }
}

.title-sponsor{
    color: $primary-color;
}

footer {
    text-align: center;
    margin: 0 auto;
    width: 50%;
    padding: 100px 0 10px 0;
    p {
        border-top: 2px solid rgba(0, 0, 0, 0.522);
    }
}

.star-rating {
    font-size: 2rem;
    color: #ccc;
}

.star {
    cursor: pointer;
}

.star i {
    transition: color 0.2s;
}

/* Stelle non selezionate */
.star input:checked ~ label i {
    color: gold;
}

/* Stelle selezionate */
.star input:checked + label i {
    color: gold;
}
</style>