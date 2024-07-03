<script>
    import axios from 'axios';
    import { store } from '../store.js';
    import AppLoader from '../components/AppLoader.vue';

    export default {
        name: 'SingleDoctor',
        components: {
            AppLoader
        },
        data() {
            return {
                store,
                doctor: null,
                loading: false,
                submit: false,
                userName: '',
                userEmail: '',
                userMessage: '',
                userObject: '',
                errors: {},
                userNameReview: '',
                userMessageReview: '',
                submitReview: false,
                userTc: '',
                userTcReview: '',
                userRate: '',
                doctorID: '',
                ratingID: '',
            }
        },
        methods: {
            // Funzione che chiama dal db il singolo dottore
            getSingleDoctor() {
                axios.get(`${this.store.apiUrl}/api/profiles/${this.$route.params.slug}`)
                .then((response) => {
                    this.doctorID = response.data.profile.id;
                    this.doctor = response.data.profile;
                    this.loading = true;
                })
            },
            // Funzione che manda al db il messaggio utente
            sendMessage() {
                const userMessage = {
                    name: this.userName,
                    email: this.userEmail,
                    message: this.userMessage,
                    object: this.userObject,
                    accepted_tc: this.userTc,
                    profile_id: this.doctorID,
                };

                this.submit = true;

                axios.post(`${this.store.apiUrl}/api/messages`, userMessage)
                .then(response => {
                    if(response.data.success) {
                        this.errors = {},
                        this.userName = '';
                        this.userEmail = '';
                        this.userMessage = '';
                        this.userObject = '';
                        this.userTc = '';
                    } else {
                        this.errors = response.data.errors;
                    }
                    this.submit = false;
                })
            },
            // Funzione che manda al db il voto e la recensione dell' utente
            sendReviewAndRating() {
                const userRate = {
                    score: this.userRate,
                };
                axios.post(`${this.store.apiUrl}/api/ratings`, userRate)
                .then(response => {
                    if(response.data.success) { 
                        console.log('response' , response.data.data.id);
                        this.ratingID = response.data.data.id;
                        this.errors = {},
                        this.userRate = '';
                    } else {
                        this.errors = response.data.errors;
                    }
                    const userReview = {
                        name: this.userNameReview,
                        description: this.userMessageReview,
                        profile_id: this.doctorID,
                        rating_id: this.ratingID,
                        // accepted_tc: this.userTcReview
                    };
    
                    this.submitReview = true;
    
                        axios.post(`${this.store.apiUrl}/api/reviews`, userReview)
                        .then(response => {
                            if(response.data.success) {
                                this.errors = {},
                                this.userNameReview = '';
                                this.userMessageReview = '';
                                this.ratingID = '';
                                // this.userTcReview = '';
                            } else {
                                this.errors = response.data.errors;
                            }
                            this.submitReview = false;
                        })
                })



            },
        },
        mounted() {
            this.getSingleDoctor();
        }
    }
</script>

<template>
    <section class="py-4">
        <div v-if="!loading" class="container py-3">
            <AppLoader></AppLoader>
        </div>
        <div v-else>
            <div class="container py-3">
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
            
    
            <!-- Form invio messaggio al dottore -->
            <div class="contact container p-2 mb-4">
                <h2>CONTATTA IL MEDICO</h2>
                <div class="danger mb-2">* campi obbligatori</div>
                <form @submit.prevent="sendMessage">
    
                    <!-- Input user name -->
                    <div class="mb-3">
                        <label class="form-check-label me-2" for="name">* Nome</label>
                        <input type="text" name="name" id="name" v-model="userName">
                    </div>
                    <div v-if="errors.name">
                        <div v-for="error in errors.name" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Input user name -->
    
                    <!-- Input object -->
                    <div class="mb-3">
                        <label class="form-check-label me-2" for="object">* Oggetto</label>
                        <input type="text" name="object" id="object" v-model="userObject">
                    </div>
                    <div v-if="errors.name">
                        <div v-for="error in errors.name" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Input object -->
    
                    <!-- Input user email -->
                    <div class="mb-3">
                        <label for="email" class="form-label me-2">* Email</label>
                        <input type="email" id="email" aria-describedby="emailHelp" name="email" v-model="userEmail">
                    </div>
                    <div v-if="errors.email">
                        <div v-for="error in errors.email" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Input user email -->
    
                    <!-- Input user message -->
                    <div class="mb-3">
                        <label for="message" class="form-label ms-label">* Chiedo al medico:</label>
                        <textarea name="message" rows="10" id="message" v-model="userMessage"></textarea>
                    </div>
                    <div v-if="errors.message">
                        <div v-for="error in errors.message" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Input user message -->
    
                    <!-- Accept TC -->
                    <div class="mb-3 form-check">
                        <label class="form-check-label" for="accepted_tc">Accetta termini e condizioni <router-link :to="{name: 'terms-and-conditions-messages'}" target="_blank">Mostra termini e condizioni</router-link></label>
                        <input type="checkbox" class="form-check-input" name="accepted_tc" id="accepted_tc" v-model="userTc">
                    </div>
                    <div v-if="errors.accepted_tc">
                        <div v-for="error in errors.accepted_tc" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Accept TC -->
    
                    <button :disable="submit" type="submit" class="btn btn-brand">{{ submit ? 'Invio...' : 'Invia'}}</button>
                </form>
            </div>
            <!-- /Form invio messaggio al dottore -->
    
            <!-- Form recensione dottore -->
            <div class="review-wrapper container p-2">
                <h2>LASCIA UNA RECENSIONE</h2>
                <div class="danger mb-2">* campi obbligatori</div>
                <form @submit.prevent="sendReviewAndRating">
                    <!-- Input user name -->
                    <div class="mb-3">
                        <label class="form-check-label me-2" for="name-review">Nome</label>
                        <input type="text" name="name" id="name-review" v-model="userNameReview">
                    </div>
                    <div v-if="errors.name">
                        <div v-for="error in errors.name" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- /Input user name -->
    
                    <!-- Input user description -->
                    <div class="mb-3">
                        <label for="description-review" class="form-label ms-label">* Lascia la tua recensione:</label>
                        <textarea name="description" rows="10" id="description-review" v-model="userMessageReview"></textarea>
                    </div>
                    <div v-if="errors.description">
                        <div v-for="error in errors.description" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div>
                    <!-- Input user description -->
    
                    <!-- User rating -->
                    <select class="form-select mb-3" aria-label="Default select example" v-model="userRate">
                        <option selected>Valuta il medico</option>
                        <option value="1"  name="score">1</option>
                        <option value="2"  name="score">2</option>
                        <option value="3"  name="score">3</option>
                        <option value="4"  name="score">4</option>
                        <option value="5"  name="score">5</option>
                    </select>
                    <!-- /User rating -->
    
                    <!-- Accept TC -->
                    <!-- <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="accepted_tc" v-model="userTc">
                        <label class="form-check-label" for="accepted_tc">Accetta termini e condizioni <router-link :to="{name: 'terms-and-conditions-reviews'}" target="_blank">Mostra termini e condizioni</router-link></label>
                    </div>
                    <div v-if="errors.accepted_tc">
                        <div v-for="error in errors.accepted_tc" class="alert alert-danger" role="alert">
                            {{ error }}
                        </div>
                    </div> -->
                    <!-- /Accept TC -->
    
                    <button :disable="submitReview" type="submit" class="btn btn-brand">{{ submitReview ? 'Invio...' : 'Invia'}}</button>
                </form>
            </div>
            <!-- /Form recensione dottore -->
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
        .ms-label{
            display: block;
        }
        textarea{
            width: 100%;
        }
        .contact,
        .review-wrapper{
            border: 2px solid white;
            border-radius: 10px;
        }
        .danger{
            color:red;
        }
    }
</style>