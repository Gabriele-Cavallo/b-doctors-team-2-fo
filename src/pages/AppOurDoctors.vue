<script>
import axios from 'axios';
import { store } from '../store.js';
import AppLoader from '../components/AppLoader.vue';

export default {
    name: 'AppOurDoctors',
    components: {
        AppLoader
    },
    data() {
        return {
            store,
            specialisations: [],
            doctors: [],
            loading: false
        };
    },
    methods: {
        getAllSpecialisations() {
            axios.get(`${this.store.apiUrl}/api/specialisations`)
                .then((response) => {
                    this.specialisations = response.data.results;
                    this.loading = true;
                });
        },
        getAllDoctors() {
            axios.get(`${this.store.apiUrl}/api/profiles`)
                .then((response) => {
                    this.doctors = response.data.results.data;
                });
        },

        getFilteredDoctors(specialisationName) {
            return this.doctors.filter(doctor =>
                doctor.specialisations.some(spec => spec.name === specialisationName)
                && doctor.visibility === 1
            ).slice(0, 5); 
        }
    },
    mounted() {
        this.getAllSpecialisations();
        this.getAllDoctors();
    }
};
</script>
<template>
    <section>
        <div v-if="!loading">
            <AppLoader></AppLoader>
        </div>
        <div v-else class="container">
            <h1>I nostri Specialisti:</h1>
            <div class="cards-wrapper row">
                <div v-for="specialisation in specialisations" :key="specialisation.id" class="card">
                    <div>
                        <h4 class="text-center py-2">{{ specialisation.name }}</h4>
                        <div class="card-text">
                            <ul class="fw-light py-1">
                                <li v-for="doctor in getFilteredDoctors(specialisation.name)" :key="doctor.id">
                                    {{ doctor.user.name }} - {{ doctor.performance }}
                                </li>
                            </ul>
                        </div>
                     
                    </div>
                    <div class="card-footer">
                        <router-link :to="{ name: 'single-specialisation', params: { slug: specialisation.slug } }" class="btn btn-brand">Mostra i dottori</router-link>
                    </div>
                </div>
            </div>
        </div>
        <footer>
            <div class="container">
                <p>© 2024 BDoctors. Tutti i diritti riservati. Le informazioni fornite su questo sito, comprese le prenotazioni delle visite mediche, i messaggi al medico e le recensioni, sono a scopo informativo e non sostituiscono il consiglio medico professionale.</p>
            </div>
        </footer>
    </section>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

section {
    color: white;
    background-color: $primary-color;
    h4 {
        color: $primary-color;
    }
    .btn-brand {
        color: $primary-color;
        background-color: $secondary-color;
        margin-top: auto; 
    }
    
    ul {
        list-style-type: none;
        margin-left: -25px;
    }

    .footer {
        color: white;
        p {
            border-top: 2px solid rgba(255, 255, 255, 0.522);
        }
    }


    .cards-wrapper {
        display: flex;
        flex-wrap: wrap;
    }

    .card-text {
    margin-right: 0 !important; /* Rimuovi il margine destro per iniziare il testo dall'inizio */
}

    .card {
        margin: 0.5rem;
        flex: 1 1 calc(50% - 1rem);
        box-sizing: border-box;
        height: 350px; 
        display: flex;
        flex-direction: column;

        @media (min-width: 1200px) {
            flex: 1 1 calc(22.333% - 1rem); 
        }

        .card-footer {
            margin-top: auto; 
            display: flex;
            justify-content: center;
            padding: 0.5rem;
            background-color: white !important;
            border: none;
        }
    }
}

</style>