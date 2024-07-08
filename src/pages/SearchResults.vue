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
            }
        },
        methods: {
            filteredResultsCall() {
                const query = this.$route.query;
                console.log('params' , this.queryParams);
                axios.get(`${this.store.apiUrl}/api/search-results`, { params: query })
                .then(response => {
                    this.filteredResults = response.data;
                    this.loading = true;
                })
            }
        },
        watch: {
            '$route.query': 'filteredResultsCall'
        },
        created() {
            this.filteredResultsCall();
        }
    }
</script>

<template>
    <section>
        <AppLoader v-if="!loading" ></AppLoader>
        <div v-else class="container">
            <h1>Risultati ricerca:</h1>
            <div class="doctor-wrapper card my-4 p-3" v-for="filteredResult in filteredResults">
                <!-- <div class="image-center">
                    <img class="profile-photo mb-3" v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.photo}`" :alt="doctor.user_name">
                </div> -->
                <p><strong>Nome:</strong> {{ filteredResult.user_name }}</p>
                <p><strong>Email:</strong> {{ filteredResult.user_mail }}</p>
                <p v-if="filteredResult.specialisations.length > 0" class="card-text"><strong>Specializzazioni: </strong>
                    <span v-for="(specialisation, index) in filteredResult.specialisations" :key="specialisation.id">
                        {{ specialisation.name }}<span v-if="index < filteredResult.specialisations.length - 1">,</span> &nbsp;
                    </span>
                </p>
                <p><strong>Numero recensioni:</strong> {{ filteredResult.review_count }}</p>
                <p><strong>Score:</strong> {{ filteredResult.average_score }}</p>
                <p><strong>Biografia:</strong> {{ filteredResult }}</p>
                <p><strong>Curriculum Vitae:</strong></p>
                    <!-- <div><img class="profile-photo mb-3" v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.curriculum_vitae}`" :alt="doctor.user_name"></div> -->
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
@use '../style/partials/variables' as *;

</style>