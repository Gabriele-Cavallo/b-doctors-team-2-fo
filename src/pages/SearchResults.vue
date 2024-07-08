<script>
import axios from 'axios';

    export default {
        name: 'SearchResults',
        data() {
            return {
                filteredResults: [],
            }
        },
        methods: {
            filteredResultsCall() {
                const query = this.$route.query;

                axios.get(`${this.store.apiUrl}/api/search-results`, { params: query })
                .then(response => {
                    this.filteredResults = response.data.results;
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
        <div class="container">
            <h1>Risultati ricerca:</h1>
            <div v-for="filteredResult in filteredResults">{{ filteredResult }}</div>
        </div>
    </section>
</template>