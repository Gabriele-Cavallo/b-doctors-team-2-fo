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
                <div class="image-center">
                    <img class="profile-photo mb-3" v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.photo}`" :alt="doctor.user_name">
                </div>
                <p><strong>Nome:</strong> {{ doctor.user.name }}</p>
                <p><strong>Email:</strong> {{ doctor.user.email }}</p>
                <p v-if="doctor.specialisations.length > 0" class="card-text"><strong>Specializzazioni:</strong>
                    <span v-for="(specialisation, index) in doctor.specialisations" :key="specialisation.id">
                        {{ specialisation.name }}<span v-if="index < doctor.specialisations.length - 1">,</span> &nbsp;
                    </span>
                </p>
                <p><strong>Performance:</strong> {{ doctor.performance }}</p>
                <p><strong>Telefono:</strong> {{ doctor.telephone_number }}</p>
                <p><strong>Biografia:</strong> {{ doctor.bio }}</p>
                <p><strong>Curricum Vitae:</strong></p>
                    <div><img class="profile-photo mb-3" v-if="doctor.photo" :src="`http://127.0.0.1:8000/storage/${doctor.curriculum_vitae}`" :alt="doctor.user_name"></div>
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
        .image-center {
            display: flex;
            justify-content: center;
        }
        .profile-photo {
            max-height: 300px;
            max-width: 300px;
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