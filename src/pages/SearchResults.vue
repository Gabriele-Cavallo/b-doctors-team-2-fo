<script>
import axios from 'axios';

    export default {
        name: 'SearchResults',
        Data() {
            return {
                filteredResults: [],
            }
        },
        props: {
            specialisations: Array,
            rating: Number,
            reviews: Number,
        },
        methods: {
            filteredResultsCall() {
                const query = this.$route.query;

                axios.get(`${this.store.apiUrl}/api/filter-results`, { params: query })
                .then(response => {
                    this.filteredResults = response.data.results;
                })
            }
        },
        created() {
            this.filteredResultsCall();
        }
    }
</script>

<template>
    <section>
        <div class="container">
            <h1>Risultati ricerca:</h1>
            <div v-for="filteredResult in filteredResults">{{ filteredResult }}</div>
        </div>
    </section>
</template>