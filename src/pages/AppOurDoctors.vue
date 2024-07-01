<script>
    import axios from 'axios';
    import { store } from '../store.js';

    export default {
        name: 'AppOurDoctors',
        data() {
            return {
                store,
                specialisations: [],
                doctors: [],
                loading: false,
            }
        },
        methods: {
            getAllSpecialisations (){
                axios.get(`${this.store.apiUrl}/api/specialisations`)
                .then((response) => {
                    this.specialisations = response.data.results;
                    this.loading = true;
                })
            },
            getAllDoctors (){
                axios.get(`${this.store.apiUrl}/api/profiles`)
                .then((response) => {
                    this.doctors = response.data.results.data;
                })
            },
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
        <div class="container py-3">
            <h1>ECCO I NOSTRI DOTTORI:</h1>
            <div class="px-2 cards-wrapper row justify-content-between anchor">
                <div v-for="specialisation in specialisations" :key="specialisation.id" class="card ms-col-6 my-3">
                    <h4>{{ specialisation.name }}</h4>
                    <div v-for="doctor in getFilteredDoctors(specialisation.name)">
                        <p>{{ doctor.user.name }} - {{doctor.performance}}</p>
                    </div>
                    <router-link :to="{ name: 'cardiologia', params: { slug: specialisation.slug } }" class="btn btn-primary show-more">Mostra i dottori</router-link>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;

section{
    color: white;
    background-color: $primary-color;
}
</style>