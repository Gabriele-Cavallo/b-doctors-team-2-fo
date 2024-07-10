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
            selectedRating: 0
        }
    },
    methods: {
        async getSingleSpecialisation() {
            await axios.get(`${this.store.apiUrl}/api/reviews`)
            .then(response => {
                this.reviews = response.data.reviews;
                console.log('review', response.data.reviews);
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
            if (!this.minRating && !this.searchQuery) {
                this.filteredDoctors = this.doctors;
                this.noDoctorsFound = false;
                return;
            }

            // Filtrare e ordinare i dottori
            this.filteredDoctors = this.doctors
                .filter(doctor => {
                    const doctorRating = this.reviews.find(review => review.profile_id === doctor.id)?.average_score || 0;
                    return (!this.minRating || doctorRating >= this.minRating) &&
                           (!this.searchQuery || doctor.user_name.toLowerCase().includes(this.searchQuery.toLowerCase()));
                })
                .sort((a, b) => {
                    const ratingA = this.reviews.find(review => review.profile_id === a.id)?.average_score || 0;
                    const ratingB = this.reviews.find(review => review.profile_id === b.id)?.average_score || 0;
                    return ratingB - ratingA; // Ordinare in ordine decrescente
                });

            this.noDoctorsFound = this.filteredDoctors.length === 0;
        },
        highlightStars(rating) {
            if (this.minRating === rating) {
                this.resetStars();
                return;
            }

            this.minRating = rating;
            this.selectedRating = rating;
            this.filterDoctors();

            const stars = document.querySelectorAll('.rating label');
            stars.forEach((star, index) => {
                if (index <= 5 - rating) {
                    star.style.color = '#f5b301'; 
                } else {
                    star.style.color = '#ddd';
                }
            });
        },
        resetStars() {
            this.minRating = 0;
            this.selectedRating = 0;
            this.filterDoctors();

            const stars = document.querySelectorAll('.rating label');
            stars.forEach((star) => {
                star.style.color = '#ddd';
            });
        }
    },
    computed: {
        getDoctorRating() {
            return doctorId => {
                const review = this.reviews.find(review => review.profile_id === doctorId);
                return review ? review.average_score : 0;
            };
        }
    },
    watch: {
        minRating: 'filterDoctors',
        searchQuery: 'filterDoctors'
    },
    mounted() {
        this.getSingleSpecialisation();
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
            <h4 class="my-3">Filtra per stelle!</h4>
            <div class="filter-wrapper my-3">
                <div class="rating">
                    <input type="radio" id="star5" name="rating" value="5" @click="highlightStars(5)" /><label for="star5" title="5 stars">★</label>
                    <input type="radio" id="star4" name="rating" value="4" @click="highlightStars(4)" /><label for="star4" title="4 stars">★</label>
                    <input type="radio" id="star3" name="rating" value="3" @click="highlightStars(3)" /><label for="star3" title="3 stars">★</label>
                    <input type="radio" id="star2" name="rating" value="2" @click="highlightStars(2)" /><label for="star2" title="2 stars">★</label>
                    <input type="radio" id="star1" name="rating" value="1" @click="highlightStars(1)" /><label for="star1" title="1 star">★</label>
                </div>
            </div>
            <div class="card-container">
                <div class="row">
                <div v-for="doctor in filteredDoctors" :key="doctor.user_slug" :class="!doctor.visibility ? 'd-none' : 'col-md-4'" class="mb-4">
                    <div class="card h-100">
                        <div>
                            <img v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.photo}`" :alt="doctor.user_name" class="card-img-top">
                            <div class="card-body">
                                <p> <strong>Nome</strong>: {{ doctor.user_name }}</p>
                                <p><strong>Email</strong>: {{ doctor.user_mail }}</p>
                                <p><strong>Specializzazione</strong>: {{ doctor.spec_name }}</p>
                                <p><strong>Performance</strong>: {{ doctor.performance }}</p>
                                <p><strong>Telefono</strong>: {{ doctor.telephone_number }}</p>
                                <div v-for="review in reviews">
                                    <p v-if="review.profile_id === doctor.id"><strong>Valutazione del Dottore</strong>: 
                                        <span v-for="n in 5" :key="n" class="star" :class="{'gold-star': n <= getDoctorRating(doctor.id)}">★</span>
                                    </p>
                                </div>
                                <p class="card-text"><strong>Numero recensioni</strong>: {{ reviewCount }}</p>
                            </div>
                        </div>
                        <div class="card-footer">
                            <router-link :to="{ name: 'single-doctor', params: { slug: doctor.user_slug } }" class="btn btn-brand">Mostra dottore</router-link>
                        </div>
                    </div>
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
        max-height: 315px;
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

    .card {
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .card-footer {
        margin-top: auto;
        text-align: center;
        background-color: transparent;
        border-top: none;
    }

}

.rating {
    direction: rtl;
    unicode-bidi: bidi-override;
    width: fit-content;
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
    color:#f5b301;
}

.rating > input:checked ~ label ~ label {
    color: #ddd;
}

.rating > input:focus ~ label {
    color:#f5b301;
}

.card-footer {
    background-color: transparent;
    border-top: none;
}

.star {
    color: #ddd;
    font-size: 1.5rem;
}

.gold-star {
    color: #f5b301;
}
</style>