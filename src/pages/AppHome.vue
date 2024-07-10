<script>
import axios from 'axios';
import { store } from '../store.js';
import AppCarousel from '../components/AppCarousel.vue';
import AppLoader from '../components/AppLoader.vue';

export default {
    name: 'AppHome',
    components: {
        AppCarousel,
        AppLoader
    },
    data() {
        return {
            store,
            specialisations: [],
            selectedRating: 5,
            minRating: 0,
            sponsoredProfiles: [],
            loading: false,
        }
    },
    methods: {
        async getProfileSponsored() {
            try {
                const response = await axios.get(`${this.store.apiUrl}/api/sponsored`);
                console.log('cards', response.data.sponsored);
                this.sponsoredProfiles = response.data.sponsored;
                console.log('sponsoredProfiles', this.sponsoredProfiles.spons_name);
            } catch (error) {
                console.error('Error fetching sponsored profiles', error);
            }
        },
        async getAllSpecialisations() {
            try {
                const response = await axios.get(`${this.store.apiUrl}/api/specialisations`);
                this.specialisations = response.data.results;
                this.loading = true;
            } catch (error) {
                console.error('Error fetching specialisations', error);
            }
        },
        async submitForm() {
            const form = document.getElementById('filterForm');
            const formData = new FormData(form);
            const params = new URLSearchParams();
            let specialisations = [];

            for (const pair of formData.entries()) {
                if (pair[0] === 'specialisation_slug') {
                    specialisations.push(pair[1]);
                } else {
                    params.append(pair[0], pair[1]);
                }
            }

            if (specialisations.length > 0) {
                params.append('specialisation_slug', specialisations.join(','));
            } else {
                // Set all specialisations as default
                this.specialisations.forEach(spec => specialisations.push(spec.slug));
                params.append('specialisation_slug', specialisations.join(','));
            }

            if (!params.has('average_score')) {
                params.append('average_score', 0);
            }

            if (!params.has('min_reviews')) {
                params.append('min_reviews', 0);
            }

            try {
                const response = await axios.get(`${this.store.apiUrl}/api/search-results`, { params: params });
                this.$router.push({ path: '/search-results', query: Object.fromEntries(params) });
            } catch (error) {
                console.error('Qualcosa è andato storto!', error);
                alert('Errore nella ricerca dei risultati. Per favore riprova.');
            }
        },
        highlightStars(rating) {
            if (this.selectedRating === rating) {
                rating = 0;
                this.selectedRating = 0;
            } else {
                this.selectedRating = rating;
            }

            const stars = document.querySelectorAll('.rating label');
            stars.forEach((star, index) => {
                if (index <= (5 - rating) && rating !== 0) {
                    star.style.color = '#f5b301';
                } else {
                    star.style.color = '#ddd';
                }
            });
        }
    },
    mounted() {
        this.getAllSpecialisations();
        this.getProfileSponsored();
        this.highlightStars(5);
    },
}
</script>

<template>
    <AppLoader v-if="!loading"></AppLoader>
    <div v-else class="home-wrapper">
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
                <AppCarousel :sponsoredProfiles="sponsoredProfiles"></AppCarousel>
            </div>
        </div>
    
        <div class="search-bar container">
            <form class="d-flex gap-3 my-4 flex-column justify-content-center" id="filterForm" @submit.prevent="submitForm">
                <h4 class="test py-3">Cerca il dottore che fa per te!</h4>
                
                <!-- Label per la specializzazione -->
                <label for="specialisation-select" class="form-label text-center">Seleziona una specializzazione:</label>
                <div class="container badge-wrapper d-flex flex-wrap gap-3 justify-content-center">
                    <div v-for="specialisation in specialisations" :key="specialisation.id">
                        <input type="checkbox" class="hide" name="specialisation_slug" :id="`specialisation-${specialisation.id}`" :value="`${specialisation.slug}`">
                        <label class="btn btn-brand badge ms-badge" :for="`specialisation-${specialisation.id}`">{{ specialisation.name }}</label>
                    </div>
                </div>
                
                <!-- Label per il numero di stelle -->
                <label for="star-rating" class="form-label text-center">Seleziona la valutazione minima desiderata (da 1 a 5 stelle):</label>
                <div class="rating">
                    <input type="radio" id="star5" name="average_score" value="5" @click="highlightStars(5)" /><label for="star5" title="5 stars">★</label>
                    <input type="radio" id="star4" name="average_score" value="4" @click="highlightStars(4)" /><label for="star4" title="4 stars">★</label>
                    <input type="radio" id="star3" name="average_score" value="3" @click="highlightStars(3)" /><label for="star3" title="3 stars">★</label>
                    <input type="radio" id="star2" name="average_score" value="2" @click="highlightStars(2)" /><label for="star2" title="2 stars">★</label>
                    <input type="radio" id="star1" name="average_score" value="1" @click="highlightStars(1)" /><label for="star1" title="1 star">★</label>
                </div>
                
                <!-- Label per il numero di recensioni -->
                <label for="min-reviews" class="form-label text-center">Seleziona un numero minimo di recensioni richieste:</label>
                <div class="reviews-count">
                    <select name="min_reviews" :value="minRating" class="form-select" id="min-reviews" aria-label="Default select example">
                        <option selected>Scegli un numero di recensioni minime</option>
                        <option value="0">0</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                
                <div class="button-wrapper d-flex justify-content-center">
                    <button type="submit" class="btn btn-brand">Cerca Medico</button>
                </div>
            </form>
        </div>
    </div>
    <footer>
        <div class="container">
            <p>© 2024 BDoctors. Tutti i diritti riservati. Le informazioni fornite su questo sito, comprese le prenotazioni delle visite mediche, i messaggi al medico e le recensioni, sono a scopo informativo e non sostituiscono il consiglio medico professionale.</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.test {
    width: fit-content;
    margin: 0 auto;
    display: flex;
    color:$primary-color;
}

input:checked ~ label.ms-badge {
    background-color: $secondary-color;
    color: $primary-color;
}

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


.btn-brand {
  color: white;
  background-color: $primary-color;
  font-weight: bold;
}

.btn-brand:hover {
    background-color: $secondary-color;
  color: $primary-color;
  font-weight: bold;
}

.title-sponsor {
    color: $primary-color;
}

footer {
    text-align: center;
    margin: 0 auto;
    width: 50%;
    padding: 100px 0 10px 0;
    p {
        border-top: 2px solid $primary-color;
    }
}

.rating {
    direction: rtl;
    unicode-bidi: bidi-override;
    width: fit-content;
    margin: 0 auto;
    display: flex;
}

.rating > input {
    display: none;
}

.rating > label {
    font-size: 2rem;
    color: #ddd;
    cursor: pointer;
    padding: 0 0.1rem;
}

.rating > input:checked ~ label {
    color: #f5b301;
}

.rating > input:checked ~ label ~ label {
    color: #ddd;
}

.rating > input:focus ~ label {
    color: #f5b301;
}

footer {
    text-align: center;
    margin: 0 auto;
    width: 50%;
    padding: 100px 0 10px 0;
    p {
        border-top: 2px solid $primary-color;
    }
}

//RESPONSIVITY
@media screen and (max-width:800px){
    footer{
        width: 90%;
    }
}
</style>