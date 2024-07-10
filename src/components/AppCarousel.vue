<script>
    export default {
  name: 'AppCarousel',
  props: {
    sponsoredProfiles: Array
  },
  data() {
    return {

      users: [],

    };
  },
  methods: {

  }

  
};
</script>


<template>
  <div class="carousel-wrapper container text-center d-flex flex-wrap justify-content-center">
    <div class="ms-w" v-for="(sponsoredProfile, index) in sponsoredProfiles" :key="index">
      <div class="card h-100 d-flex flex-column">
        <div class="img-container d-flex justify-content-center align-items-center">
          <img :src="`http://127.0.0.1:8000/storage/${sponsoredProfile.photo}`" alt="doctor-image" class="card-img-top">
        </div>
        <div class="card-body flex-grow-1 d-flex flex-column">
          <h5 class="card-title">{{ sponsoredProfile.user_name }}</h5>
          <p class="card-text"><strong>Specializzazione:</strong></p>
          <p>{{ sponsoredProfile.specialization_name.join(' ') }}</p>
          <router-link :to="{ name: 'single-doctor', params: { slug: sponsoredProfile.user_slug } }" class="btn btn-brand mt-auto">Mostra dottore</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.img-container {
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
}



  img {
        max-height: 315px;
        object-fit: cover; 
}

.btn-brand {
  color: white;
  background-color: $primary-color;
  font-weight: bold;
}

.btn-brand:hover {
  background-color: $secondary-color;
  color: $primary-color;
  font-weight: bold;
}

.card {
  h5 {
    color: $primary-color;
  }
  p {

    strong
  
  {
    color: $primary-color;
  }
}
}


.ms-w {
  width: calc((100% / 4) - 20px);
  margin: 10px;
}

@media (max-width: 1200px) {
  .ms-w {
    width: calc((100% / 3) - 20px);
  }
}

@media (max-width: 992px) {
  .ms-w {
    width: calc((100% / 2) - 20px);
  }
}

@media (max-width: 768px) {
  .ms-w {
    width: 100%;
  }
}

.ms-col {
  border: 2px solid #00c3a5;
  border-radius: 20px;
}
</style>