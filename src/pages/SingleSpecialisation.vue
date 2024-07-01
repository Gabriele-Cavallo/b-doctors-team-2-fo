<script>
    import axios from 'axios';
    import { store } from '../store.js';

    export default {
        name: 'SingleSpecialisation',
        data() {
            return {
                store,
                doctors: [],
            }
        },
        methods: {
            getSingleSpecialisation (){
                axios.get(`${this.store.apiUrl}/api/specialisations/${this.$route.params.slug}`)
                .then((response) => {
                    console.log('Lable' , response.data.results);
                    this.doctors = response.data.results;
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
                <h1>[Specialisation name]</h1>
                <router-link :to="{ name: 'our-doctors' }" class="btn btn-brand">Ritorna</router-link>
            </div>
            <div v-for="doctor in doctors" class="doctors-wrapper">
                <p><strong>Nome</strong>: {{ doctor.user.name }}</p>
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