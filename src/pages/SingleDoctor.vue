<script>
    import axios from 'axios';
    import { store } from '../store.js';

    export default {
        name: 'SingleDoctor',
        data() {
            return {
                store,
                doctor: null,
                loading: false,
            }
        },
        methods: {
            getSingleDoctor() {
                axios.get(`${this.store.apiUrl}/api/profiles/${this.$route.params.slug}`)
                .then((response) => {
                    this.doctor = response.data.profile;
                    this.loading = true;
                })
            },
        },
        mounted() {
            this.getSingleDoctor();
        }
    }
</script>

<template>
    <section>
        <div class="container py-3" v-if="loading && doctor">
            <div class="wrapper d-flex align-items-center justify-content-between">
                <h1>{{ doctor.spec_name }}</h1>
                <router-link :to="{ name: 'our-doctors' }" class="btn btn-brand">Ritorna</router-link>
            </div>
            <div class="doctor-wrapper card my-4 p-3">
                <img class="profile-photo mb-3" v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.photo}`" :alt="doctor.user_name">
                <p><strong>Nome</strong>: {{ doctor.user_name }}</p>
                <p><strong>Email</strong>: {{ doctor.user_mail }}</p>
                <p><strong>Specializzazione</strong>: {{ doctor.spec_name }}</p>
                <p><strong>Performance</strong>: {{ doctor.performance }}</p>
                <p><strong>Telefono</strong>: {{ doctor.telephone_number }}</p>
                <p><strong>Bio</strong>: {{ doctor.bio }}</p>
            </div>
        </div>
        <div v-else class="container py-3">
            <p>Loading...</p>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    @use '../style/partials/variables' as *;

    section {
        background-color: $primary-color;
        color: white;
        .btn-brand {
            color: $primary-color;
            background-color: $secondary-color;
        }
        .profile-photo {
            max-height: 100px;
            max-width: 100px;
            border-radius: 20px;
            object-fit: cover;
        }
        p {
            strong {
                color: $primary-color;
            }
        }
    }
</style>