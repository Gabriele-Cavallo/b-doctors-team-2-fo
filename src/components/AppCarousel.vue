<script>
    export default {
  name: 'AppCarousel',
  props: {
    sponsoredProfiles: Array
  },
  data() {
    return {
      isDragging: false,
      isAutoPlay: true,
      startX: 0,
      startScrollLeft: 0,
      timeoutId: null,
      users: [],
      cardPerView: 0,
    };
  },
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

  <div class="carousel-wrapper">
    <div class="wrapper" ref="wrapper">
      <div class="carousel" ref="carousel">
        <ul class="carousel">
          <li v-for="sponsoredProfile in sponsoredProfiles" :key="sponsoredProfile.id" class="card">
            <div class="img">
              <img :src="sponsoredProfile.photo" alt="" draggable="false" />
            </div>
            <h2>{{ sponsoredProfile.user_name }}</h2>
            <div>
              <img class="profile-photo mb-3" v-if="sponsoredProfile.photo" :src="`http://127.0.0.1:8000/storage/${sponsoredProfile.photo}`" :alt="sponsoredProfile.user_name">
            </div>
            <p>{{ sponsoredProfile.specialisations }}</p>
            <p>{{ sponsoredProfile.performance }}</p>
          </li>
          
        </ul>
      <p>  {{ sponsoredProfiles }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>