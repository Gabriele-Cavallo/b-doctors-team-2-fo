<script>
    export default {
  name: 'AppCarousel',
  props: {
    sponsoredProfiles: Array
  },
  data() {
    return {
      // isDragging: false,
      // isAutoPlay: true,
      // startX: 0,
      // startScrollLeft: 0,
      // timeoutId: null,
      users: [],
      //cardPerView: 0,
    };
  },
  methods: {
    scrollLeft() {
        const containerWidth = this.$refs.carousel.offsetWidth;
        if (this.translateX < 0 || this.translateX >= 0) {
            this.translateX += (containerWidth / this.images.length);
            this.$refs.carousel.style.setProperty('--translate-x', `${this.translateX}px`);
        }
    },
    scrollRight() {
        const containerWidth = this.$refs.carousel.offsetWidth;
        if (this.translateX < 0 || this.translateX >= 0) {
            this.translateX -= (containerWidth / this.images.length);
            this.$refs.carousel.style.setProperty('--translate-x', `${this.translateX}px`);
        }
    },
  }
  // mounted() {
  //   this.initCarousel();
  //   this.autoPlay();
  //   this.$refs.carousel.addEventListener("mousedown", this.dragStart);
  //   this.$refs.carousel.addEventListener("mousemove", this.dragging);
  //   document.addEventListener("mouseup", this.dragStop);
  //   this.$refs.carousel.addEventListener("scroll", this.infiniteScroll);
  //   this.$refs.wrapper.addEventListener("mouseenter", this.clearAutoPlay);
  //   this.$refs.wrapper.addEventListener("mouseleave", this.autoPlay);
  // },
  // methods: {
    
  //   initCarousel() {
  //     const carousel = this.$refs.carousel;
  //     const firstCardWidth = carousel.querySelector(".card").offsetWidth;
  //     const carouselChildrens = [...carousel.children];
  //     this.cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      
  //     carouselChildrens.slice(-this.cardPerView).reverse().forEach(card => {
  //       carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  //     });

      
  //     carouselChildrens.slice(0, this.cardPerView).forEach(card => {
  //       carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  //     });

      
  //     carousel.classList.add("no-transition");
  //     carousel.scrollLeft = carousel.offsetWidth;
  //     carousel.classList.remove("no-transition");
  //   },
  //   scrollLeft() {
  //     const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
  //     this.$refs.carousel.scrollLeft -= firstCardWidth;
  //   },
  //   scrollRight() {
  //     const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
  //     this.$refs.carousel.scrollLeft += firstCardWidth;
  //   },
  //   dragStart(e) {
  //     this.isDragging = true;
  //     this.$refs.carousel.classList.add("dragging");
  //     this.startX = e.pageX;
  //     this.startScrollLeft = this.$refs.carousel.scrollLeft;
  //   },
  //   dragging(e) {
  //     if (!this.isDragging) return;
  //     this.$refs.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
  //   },
  //   dragStop() {
  //     this.isDragging = false;
  //     this.$refs.carousel.classList.remove("dragging");
  //   },
  //   infiniteScroll() {
  //     const carousel = this.$refs.carousel;
  //     if (carousel.scrollLeft === 0) {
  //       carousel.classList.add("no-transition");
  //       carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
  //       carousel.classList.remove("no-transition");
  //     } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
  //       carousel.classList.add("no-transition");
  //       carousel.scrollLeft = carousel.offsetWidth;
  //       carousel.classList.remove("no-transition");
  //     }
  //     clearTimeout(this.timeoutId);
  //     if (!this.$refs.wrapper.matches(":hover")) this.autoPlay();
  //   },
  //   autoPlay() {
  //     if (window.innerWidth < 800 || !this.isAutoPlay) return;
  //     const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
  //     this.timeoutId = setTimeout(() => {
  //       this.$refs.carousel.scrollLeft += firstCardWidth;
  //     }, 15000);
  //   },
  //   clearAutoPlay() {
  //     clearTimeout(this.timeoutId);
  //   },
  // },
  // beforeDestroy() {
  //   this.$refs.carousel.removeEventListener("mousedown", this.dragStart);
  //   this.$refs.carousel.removeEventListener("mousemove", this.dragging);
  //   document.removeEventListener("mouseup", this.dragStop);
  //   this.$refs.carousel.removeEventListener("scroll", this.infiniteScroll);
  //   this.$refs.wrapper.removeEventListener("mouseenter", this.clearAutoPlay);
  //   this.$refs.wrapper.removeEventListener("mouseleave", this.autoPlay);
  // },
};
</script>


<template>
  <!-- <div class="carousel-wrapper">
    <div class="wrapper" ref="wrapper">
    <div class="carousel" ref="carousel">
      <ul class="carousel">
        <li  v-for="sponsoredProfile in sponsoredProfiles" :key="sponsoredProfile.id" class="card">
          <div class="img">
            <img :src="sponsoredProfile.photo" alt="" draggable="false" />
          </div>
          <h2>{{ sponsoredProfile.user_name }}</h2>
        </li>
      </ul>
    </div>
    <i class="fa-solid fa-chevron-left" id="left" @click="scrollLeft"></i>
    <i class="fa-solid fa-chevron-right" id="right" @click="scrollRight"></i>
    </div>
  </div>-->
  <!-- <div>
    <ul class="carousel text-center">
      <li  v-for="sponsoredProfile in sponsoredProfiles" :key="sponsoredProfile.id" class="card">
        <div>
          <img :src="sponsoredProfile.photo" alt="" draggable="false" />
        </div>
        <h2>{{ sponsoredProfile.user_name }}</h2>
        <div class="">
            <img class="profile-photo mb-3" v-if="sponsoredProfile.photo" :src="`http://127.0.0.1:8000/storage/${sponsoredProfile.photo}`" :alt="sponsoredProfile.user_name">
        </div>
        <p>{{ sponsoredProfile.specialisations }}</p>
        <p>{{ sponsoredProfile.performance }}</p>
      </li>
    </ul>
  </div> -->
  <!-- <div class="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
    <div v-for="sponsoredProfile in sponsoredProfiles" :key="sponsoredProfile.id" class="col ms-col">
      <div class="img">
        <img :src="sponsoredProfile.photo" alt="" draggable="false"/>
      </div>
      <h2 class="py-3 px-2">{{ sponsoredProfile.user_name }}</h2> -->
      <!-- <h2>{{ sponsoredProfile.user_name }}</h2> -->
      <!-- <p class="p-2">{{ sponsoredProfile.specialisations }}</p>
      <p class="p-2">{{ sponsoredProfile.performance }}</p>
    </div>
  </div>  -->
  

<!-- <div id="carouselExampleCaptions" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button v-for="sponsoredProfile, index in sponsoredProfiles" :key="sponsoredProfile.id" type="button" data-bs-target="#carouselExampleCaptions" :data-bs-slide-to="index" class="active" aria-current="true"></button>
  </div>
  <div class="carousel-inner card">
    <div v-for="sponsoredProfile in sponsoredProfiles" :key="sponsoredProfile.id" :class="['carousel-item', { active: index === 0 }]" class="d-flex flex-column card-body carousel-item">
      <img :src="`http://127.0.0.1:8000/storage/${sponsoredProfile.photo}`" class="d-block w-100" alt="">
      <div class="carousel-caption d-none d-md-block">
        <h5 class="card-title">{{ sponsoredProfile.user_name }}</h5>
        <p class="card-text">{{ sponsoredProfile.specialisations }}</p>
        <p class="card-text">{{ sponsoredProfile.performance }}</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div> -->
<div class="ms-carousel" ref="carousel">
        <div class="images">
            <img v-for="sponsoredProfile, index in sponsoredProfiles" :key="sponsoredProfile.index" :src="`http://127.0.0.1:8000/storage/${sponsoredProfile.photo}`" alt="carousel image" class="carousel-image">
        </div>
        <div class="btn-wrapper">
            <button class="left" @click="scrollLeft">Scorri a sinistra</button>
            <button class="right" @click="scrollRight">Scorri a destra</button>
        </div>
    </div>

</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;


:root {
  --translate-x: 0;
}
.btn-wrapper{
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    margin: 0 -150px;
    transform: translateY(-50%);
}
.ms-carousel {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  padding: 0 150px;
}
.images {
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(var(--translate-x));
}
.carousel-image {
  width: 100%;
  height: auto;
}
// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
// }

// body {
//   display: flex;
//   padding: 0 35px;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-color: rgb(62, 223, 169);
// }

// .wrapper {
//   max-width: 1100px;
//   width: 100%;
//   position: relative;

//   i {
//   top: 50%;
//   height: 50px;
//   width: 50px;
//   cursor: pointer;
//   position: absolute;
//   text-align: center;
//   line-height: 50px;
//   background: #c9c9c986;
//   border-radius: 50%;
//   transform: translateY(-50%);
//   }
//   i:first-child {
//   left: -22px;
//   }
//   i:last-child {
//   right: -22px;
//   }

//   .carousel {
//     display: grid;
//     grid-auto-flow: column;
//     grid-auto-columns: calc((100% / 3) - 12px);
//     overflow-x: auto;
//     gap: 16px;
//     border-radius: 8px;
//     scroll-behavior: smooth;
//     scrollbar-width: none;

//     &::-webkit-scrollbar {
//       display: none;
//     }

//     &.no-transition {
//       scroll-behavior: auto;
//     }

//     .card,
//     .img {
//       display: flex;
//       justify-content: center;
//       align-items: center;
//     }

//     .card {
//       scroll-snap-align: start;
//       height: 342px;
//       list-style: none;
//       background: #fff;
//       cursor: pointer;
//       padding-bottom: 15px;
//       flex-direction: column;
//       border-radius: 8px;
//       width: 20rem;

//       .img {
//         background: #00c3a5;
//         height: 148px;
//         width: 148px;
//         border-radius: 50%;

//         img {
//           width: 140px;
//           height: 140px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 4px solid #fff;
//         }
//       }

//       h2 {
//         margin: 30px 0 5px;
//       }

//       span {
//         color: #6a6d78;
//         font-size: 1.31rem;
//       }
//     }
//   }
// }

// /* RESPONSIVITY */
// @media screen and (max-width: 900px) {
//   .wrapper .carousel {
//     grid-auto-columns: calc((100% / 2) - 10px);
//   }
// }

// @media screen and (max-width: 600px) {
//   .wrapper .carousel {
//     grid-auto-columns: 100%;
//   }
// }
.ms-col{
  border: 2px solid #00c3a5;
  border-radius: 20px;
}
</style>