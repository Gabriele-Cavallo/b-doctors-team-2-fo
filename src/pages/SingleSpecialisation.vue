<script>
import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';


export default {
    name: 'SingleSpecialisation',
    components: {
        AppLoader
    },
    data() {
        return {
            store,
            doctors: [],
            filteredDoctors: [],
            loading: false,
            minRating: 0,
            searchQuery: '',
            filterByRating: false,
            noDoctorsFound: false,
            reviews: [],
            reviewCount: '',
        }
    },
    methods: {
        async getSingleSpecialisation() {
            await axios.get(`${this.store.apiUrl}/api/reviews`)
            .then(response => {
                this.reviews = response.data.reviews;
                console.log('review' , response.data.reviews);
                axios.get(`${this.store.apiUrl}/api/specialisations/${this.$route.params.slug}`)
                .then((response) => {
                    this.doctors = response.data.profile;
                    this.filteredDoctors = this.doctors;
                    this.loading = true;
                    this.filterDoctors();
                })
            })
        },
        getReviewsCount() {
            axios.get(`${this.store.apiUrl}/api/reviewscount`)
            .then(response => {
                this.reviewCount = response.data.results[0].review_count;
            })
        },
        filterDoctors() {
            if (!this.minRating && !this.searchQuery && !this.filterByRating) {
                this.filteredDoctors = this.doctors;
                this.noDoctorsFound = false;
                return;
            }

            this.filteredDoctors = this.doctors.filter(doctor =>
                (!this.minRating || doctor.rating >= this.minRating) &&
                (!this.searchQuery || doctor.user_name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
                (!this.filterByRating || (doctor.rating >= 0 && doctor.rating <= 5))
            );

            this.noDoctorsFound = this.filteredDoctors.length === 0;
        },
        resetRating() {
            this.minRating = 0;
            this.highlightStars(0);
        },
        setRating(rating) {
            this.minRating = rating;
            this.highlightStars(rating);
        },
        highlightStars(rating) {
            const labels = document.querySelectorAll('.rating-stars label');
            labels.forEach((label, index) => {
                if (index + 1 <= rating) {
                    label.classList.add('highlighted');
                } else {
                    label.classList.remove('highlighted');
                }
            });
        }
    },
    watch: {
        minRating: 'filterDoctors',
        searchQuery: 'filterDoctors',
        filterByRating: 'filterDoctors'
    },
    mounted() {
        this.getSingleSpecialisation();
        // this.getSingleReview();
        // this.getReviewsCount();
    }
}
</script>

<template>
    <section>
        <div v-if="!loading" class="container py-3">
            <AppLoader></AppLoader>
        </div>
        <div v-else class="container py-3">
            <div class="wrapper d-flex align-items-center justify-content-between">
                <div v-if="loading">
                    <h1>{{ doctors[0]?.spec_name }}</h1>
                </div>
                <router-link :to="{ name: 'our-doctors' }" class="btn btn-brand">Ritorna</router-link>
            </div>
            <h4 class="py-3">Filtra per stelle!</h4>
            <div class="filter-wrapper my-3">
                <div class="rating-stars">
                    <input type="radio" name="rating" id="rs0" v-model="minRating" value="0" ><label for="rs0"></label>
                    <input type="radio" name="rating" id="rs1" v-model="minRating" value="1" @click="setRating(0)"><label for="rs1"></label>
                    <input type="radio" name="rating" id="rs2" v-model="minRating" value="2" @click="setRating(2)"><label for="rs2"></label>
                    <input type="radio" name="rating" id="rs3" v-model="minRating" value="3" @click="setRating(3)"><label for="rs3"></label>
                    <input type="radio" name="rating" id="rs4" v-model="minRating" value="4" @click="setRating(4)"><label for="rs4"></label>
                    <input type="radio" name="rating" id="rs5" v-model="minRating" value="5" @click="setRating(5)"><label for="rs5"></label>
                    <button @click="resetRating" class="btn btn-brand ms-3">Reset</button>
                </div>
            </div>
            <div v-for="doctor in filteredDoctors" class="doctors-wrapper card my-4 p-3" :key="doctor.user_slug">
                <div class="card-wrapper d-flex align-items-center">
                    <div class="img-wrapper me-3">
                        <img v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.photo}`" :alt="doctor.user_name">
                    </div>
                    <div class="info-wrapper">
                        <p><strong>Nome</strong>: {{ doctor.user_name }}</p>
                        <p><strong>Email</strong>: {{ doctor.user_mail }}</p>
                        <p><strong>Specializzazione</strong>: {{ doctor.spec_name }}</p>
                        <p><strong>Performance</strong>: {{ doctor.performance }}</p>
                        <p><strong>Telefono</strong>: {{ doctor.telephone_number }}</p>
                        <p v-for="review in reviews">
                            <p v-if="review.profile_id === doctor.id"><strong>Rating</strong>: {{ review.average_score }}</p>
                        </p>
                        <p><strong>Numero recensioni</strong>: {{ reviewCount }}</p>
                        <router-link :to="{ name: 'single-doctor', params: { slug: doctor.user_slug } }" class="btn btn-brand">Mostra dottore</router-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

section {
    background-color: $primary-color;
    color: white;
    .btn-brand {
        color: $primary-color;
        background-color: $secondary-color;
    }
    p {
        strong {
            color: $primary-color;
        }
    }
    img {
        max-height: 250px;
        object-fit: cover;
    }
    .filter-wrapper, .search-wrapper, .checkbox-wrapper {
        display: flex;
        align-items: center;
        label {
            margin-right: 10px;
        }
    }
    .no-doctors-found {
        text-align: center;
    }
}

.rating-stars {
    display: block;
    width: 50vmin;
    padding: 1px 1px 2px 3px;
    border-radius: 5vmin 5vmin 5vmin 5vmin;
    position: relative;
}

.rating-stars input {
    display: none;
}

.rating-stars label {
    width: 20px;
    height: 20px;
    background: #000b;
    display: inline-flex;
    cursor: pointer;
    margin: 0.5vmin 0.65vmin;
    transition: all 1s ease 0s;
    clip-path: polygon(50% 0%, 66% 32%, 100% 38%, 78% 64%, 83% 100%, 50% 83%, 17% 100%, 22% 64%, 0 38%, 34% 32%);
}

.rating-stars label[for=rs0] {
    display: none;
}

.rating-stars label:before {
    width: 90%;
    height: 90%;
    content: "";
    background: orange;
    z-index: -1;
    display: block;
    margin-left: 5%;
    margin-top: 5%;
    clip-path: polygon(50% 0%, 66% 32%, 100% 38%, 78% 64%, 83% 100%, 50% 83%, 17% 100%, 22% 64%, 0 38%, 34% 32%);
    background: linear-gradient(90deg, yellow, orange 30% 50%, #184580 50%, 70%, #173a75 100%);
    background-size: 205% 100%;
    background-position: 0 0;
}

.rating-stars label:hover:before {
    transition: all 0.25s ease 0s;
}

.rating-stars input:checked + label ~ label:before {
    background-position: 100% 0;
    transition: all 0.25s ease 0s;
}

.rating-stars input:checked + label ~ label:hover:before {
    background-position: 0% 0;
}

.rating-stars .highlighted {
    background-position: 100% 0 !important;
}

.rating-stars label[for=rs1]:hover ~ .rating-counter:before {
    content: "1" !important;
}

.rating-stars label[for=rs2]:hover ~ .rating-counter:before {
    content: "2" !important;
}

.rating-stars label[for=rs3]:hover ~ .rating-counter:before {
    content: "3" !important;
}

.rating-stars label[for=rs4]:hover ~ .rating-counter:before {
    content: "4" !important;
}

.rating-stars label[for=rs5]:hover ~ .rating-counter:before {
    content: "5" !important;
}

.rating-stars input:checked:hover ~ .rating-counter:before {
    animation: none !important;
    color: #ffab00 !important;
}
</style>