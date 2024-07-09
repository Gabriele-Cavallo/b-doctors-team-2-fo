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
            // Controlla se almeno una delle specializzazioni del profilo coincide con specialisationParams
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
            console.log('specialisationParams', this.specialisationParams);
            console.log('scoreParams', this.scoreParams);
            console.log('reviewsParams', this.reviewsParams);
            axios.get(`${this.store.apiUrl}/api/search-results`, { params: query })
                .then(response => {
                    this.filteredResults = response.data;
                    this.loading = true;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    this.loading = true; // Gestione dell'errore
                });
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
        <div v-else class="container">
            <h1>Risultati ricerca:</h1>
            <template v-if="filteredResultsFiltered.length > 0">
                <div class="doctor-wrapper card my-4 p-3" v-for="filteredResult in filteredResultsFiltered" :key="filteredResult.id">
                    <div class="">
                        <img class="profile-photo mb-3" v-if="filteredResult.photo" :src="`http://127.0.0.1:8000/storage/${filteredResult.photo}`" :alt="filteredResult.user_name">
                    </div>
                    <p><strong>Nome:</strong> {{ filteredResult.user_name }}</p>
                    <p><strong>Email:</strong> {{ filteredResult.user_mail }}</p>
                    <p class="card-text"><strong>Specializzazioni: </strong>
                        <span v-for="(specialisation, index) in filteredResult.specialisations" :key="specialisation.id">
                            {{ specialisation.name }}<span v-if="index < filteredResult.specialisations.length - 1">,</span> &nbsp;
                        </span>
                    </p>
                    <p><strong>Numero recensioni:</strong> {{ filteredResult.review_count }}</p>
                    <p><strong>Score:</strong> {{ filteredResult.average_score }}</p>
                </div>
                <p v-if="filteredResultsFiltered.length === 0">Nessun risultato trovato.</p>
            </template>
            <p v-else>Nessun risultato trovato.</p>
        </div>
    </section>
</template>


<style scoped lang="scss">
@use '../style/partials/variables' as *;

</style>
