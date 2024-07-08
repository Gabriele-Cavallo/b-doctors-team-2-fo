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
                loading: false,
            }
        },
        methods: {
            // Funzione che prende dal db l'elenco delle specializzazioni
            getAllSpecialisations (){
                axios.get(`${this.store.apiUrl}/api/specialisations`)
                .then((response) => {
                    this.specialisations = response.data.results;
                    this.loading = true;
                })
            },
            // Funzione che prende dal db tutti i dottori
            getAllDoctors (){
                axios.get(`${this.store.apiUrl}/api/profiles`)
                .then((response) => {
                    this.doctors = response.data.results.data;
                })
            },
            // Funzione che torna un array di dottori filtrato in base al nome della specializzazione della card in cui sono inseriti
            getFilteredDoctors(specialisationName) {
                return this.doctors.filter(doctor => 
                doctor.specialisations.some(allSpecialisations  => allSpecialisations.name === specialisationName)
            ).slice(0, 5);
        }

        },
        mounted (){
            this.getAllSpecialisations();
            this.getAllDoctors();
        }
    }
</script>

<template>
    <section>
        <div v-if="!loading">
            <AppLoader></AppLoader>
        </div>
        <div v-else class="container py-3">
            <h1>I nostri Specialisti:</h1>
            <div class="px-2 cards-wrapper row justify-content-between anchor">
                <div v-for="specialisation in specialisations" :key="specialisation.id" class="card ms-col-6 my-3">
                    <div class="show-more my-2">
                        <h4>{{ specialisation.name }}</h4>
                        <router-link :to="{ name: 'single-specialisation', params: { slug: specialisation.slug } }" class="btn btn-brand">Mostra i dottori</router-link>
                    </div>
                    <ul v-for="doctor in getFilteredDoctors(specialisation.name)">
                        <div v-if="doctor.visibility === 1">
                            <li>{{ doctor.user.name }} - {{doctor.performance}}</li>
                        </div>
                    </ul>
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

section{
    color: white;
    background-color: $primary-color;
    h4{
        color:$primary-color;
    }
    .btn-brand{
        color:$primary-color;
        background-color: $secondary-color;
    }

    footer{
    text-align: center;
    margin: 0 auto;
    width: 50%;
    padding: 100px 0 10px 0;
    p{
        border-top: 2px solid rgba(255, 255, 255, 0.522);
    }
}
}


//RESPONSIVITY
@media screen and (max-width:800px){
    footer{
        width: 90%;
    }
}
</style>