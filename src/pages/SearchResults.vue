<script>
import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';

export default {
    name: 'SearchResults',
    components: {
        AppLoader
    },
    data() {
        return {
            store,
            filteredResults: [],
            loading: false,
            specialisationParams: [], // Array di specializzazioni
            scoreParams: 0, // Score minimo
            reviewsParams: 0 // Numero minimo di recensioni
        };
    },
    computed: {
        filteredResultsFiltered() {
            return this.filteredResults.filter(result => this.shouldShowCard(result));
        }
    },
    methods: {
        shouldShowCard(result) {
            return result.specialisations.some(spec => this.specialisationParams.includes(spec.slug)) &&
                    result.average_score >= this.scoreParams &&
                    result.review_count >= this.reviewsParams;
        },
        filteredResultsCall() {
            const query = JSON.parse(JSON.stringify(this.$route.query));
            const specialisationSlugs = query.specialisation_slug || '';
            this.specialisationParams = specialisationSlugs.split(',').map(slug => slug.trim());
            this.scoreParams = parseInt(query.average_score);
            this.reviewsParams = parseInt(query.min_reviews);
            axios.get(`${this.store.apiUrl}/api/search-results`, { params: query })
                .then(response => {
                    this.filteredResults = response.data;
                    this.loading = true;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    this.loading = true; // Gestione dell'errore
                });
        },
        getStars(score) {
            const fullStars = Math.floor(score);
            const halfStar = score % 1 !== 0;
            const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
            return {
                fullStars: fullStars,
                halfStar: halfStar,
                emptyStars: emptyStars
            };
        }
    },
    watch: {
        '$route.query': 'filteredResultsCall'
    },
    created() {
        this.filteredResultsCall();
    }
};
</script>

<template>
    <section>
        <AppLoader v-if="!loading" ></AppLoader>
        <div v-else class="container py-5">
            <h1>Risultati della ricerca:</h1>
            <template v-if="filteredResultsFiltered.length > 0">
                <div class="card-container">
                    <div class="card h-100" v-for="filteredResult in filteredResultsFiltered" :key="filteredResult.id">
                        <img :src="`http://127.0.0.1:8000/storage/${filteredResult.photo}`" class="card-img-top" alt="...">
                        <div class="card-body">
                            <p><strong>Nome:</strong> {{ filteredResult.user_name }}</p>
                            <p><strong>Email:</strong> {{ filteredResult.user_mail }}</p>
                            <p class="card-text"><strong>Specializzazioni: </strong>
                                <span v-for="(specialisation, index) in filteredResult.specialisations" :key="specialisation.id">
                                    {{ specialisation.name }}<span v-if="index < filteredResult.specialisations.length - 1">,</span> &nbsp;
                                </span>
                            </p>
                            <p><strong>Numero recensioni:</strong> {{ filteredResult.review_count }}</p>
                            <p><strong>Score:</strong>
                                <span class="stars">
                                    <span v-for="n in getStars(filteredResult.average_score).fullStars" :key="'full-' + n" class="star full">&#9733;</span>
                                    <span v-if="getStars(filteredResult.average_score).halfStar" class="star half">&#9733;</span>
                                    <span v-for="n in getStars(filteredResult.average_score).emptyStars" :key="'empty-' + n" class="star empty">&#9733;</span>
                                </span>
                            </p>
                        </div>
                        <div class="card-footer text-center">
                            <router-link :to="{ name: 'single-doctor', params: { slug: filteredResult.user_slug } }" class="btn btn-brand">Mostra dottore</router-link>
                        </div>
                    </div>
                </div>
            </template>
            <p v-else>Nessun risultato trovato.</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '../style/partials/variables' as *;

section {
    color: white;
    background-color: $primary-color;
    padding: 20px;
    img {
        max-height: 315px;
        object-fit: cover;
    }
    .btn-brand {
        color: $primary-color;
        background-color: $secondary-color;
    }
    .stars {
        display: inline-flex;
        .star {
            font-size: 20px;
            &.full, &.half {
                color: #f5b301;
            }
            &.empty {
                color: gray;
            }
        }
    }
    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        justify-content: center;
        margin: 0 auto;
        max-width: 1200px;
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


</style>