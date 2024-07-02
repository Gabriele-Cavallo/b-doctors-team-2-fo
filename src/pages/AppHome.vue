<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    data() {
        return {
            store,
            specialisations: [],
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
    },
    mounted () {
        this.getAllSpecialisations();
    }
}
</script>
<template>
    <div class="container-fluid custom-background">
        <div class="row justify-content-center align-items-start">
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center">
                <div class="blue-box">
                    <img src="https://imgur.com/GBXXplQ.jpg" alt="">
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center my-3">
                <div class="ms-scritte">
                    <h1 class="text-center text-white ms-mb">Benvenuto in BDoctors!</h1>
                    <h2 class="text-center text-white ms-mb-2">Qui troverai lo specialista che fa per te!</h2>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-10 d-flex flex-column align-items-center">
                <div class="red-box">
                    <img src="https://imgur.com/P5b3i9X.jpg" alt="">
                </div>
            </div>
        </div>
    </div>
    <div class="search-bar container container-fluid d-flex gap-3 my-4 flex-wrap justify-content-center">
        <div v-for="specialisation in specialisations" :key="specialisation.id">
            <router-link :to="{ name: 'single-specialisation', params: { slug: specialisation.slug } }" class="btn btn-brand badge ms-badge">{{ specialisation.name }}</router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.ms-mb {
    margin-top: 100px;
    margin-bottom: 50px;
}

.custom-background {
    background-color: #00c3a5;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

.blue-box, .red-box {
    width: 100%;
    max-width: 400px;
    height: auto;
    overflow: hidden;

}

.blue-box img, .red-box img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.ms-scritte {
    width: 100%;
    max-width: 600px;
    text-align: center;
    margin-top: 1rem;
}

.text-white {
    color: white;
}
.ms-badge{
    background-color: $primary-color;
}
.btn:hover{
    &.ms-badge{
        background-color: $secondary-color;
        color: $primary-color;
    }
}
</style>