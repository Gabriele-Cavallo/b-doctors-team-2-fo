<script>
    import axios from 'axios';
    import { store } from '../store.js';

    export default {
        name: 'SingleSpecialisation',
        data() {
            return {
                store,
                doctors: [],
                loading: false,
            }
        },
        methods: {
            getSingleSpecialisation (){
                axios.get(`${this.store.apiUrl}/api/specialisations/${this.$route.params.slug}`)
                .then((response) => {
                    this.doctors = response.data.profile;
                    this.loading = true;
                })
            },
        },
        mounted() {
            this.getSingleSpecialisation();
        }
    }
</script>

<template>
    <section>
        <div class="container py-3">
            <div class="wrapper d-flex align-items-center justify-content-between">
                <div v-if="loading">
                    <h1>{{ doctors[0].spec_name }}</h1>
                </div>
                <router-link :to="{ name: 'our-doctors' }" class="btn btn-brand">Ritorna</router-link>
            </div>
            <div v-for="doctor in doctors" class="doctors-wrapper card my-4 p-3">
                <img src="" :alt="doctor.user_name">
                <p><strong>Nome</strong>: {{ doctor.user_name }}</p>
                <p><strong>Email</strong>: {{ doctor.user_mail }}</p>
                <p><strong>Specializzazione</strong>: {{ doctor.spec_name}}</p>
                <p><strong>Performance</strong>: {{ doctor.performance}}</p>
                <p><strong>Telefono</strong>: {{ doctor.telephone_number}}</p>
                <p><strong>Bio</strong>: {{ doctor.bio}}</p>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;

section{
    background-color: $primary-color;
    color: white;
    .btn-brand{
        color:$primary-color;
        background-color: $secondary-color;
}
}
</style>