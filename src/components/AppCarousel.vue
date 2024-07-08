<script>
    export default {
  name: 'AppCarousel',
  data() {
    return {
      isDragging: false,
      isAutoPlay: true,
      startX: 0,
      startScrollLeft: 0,
      timeoutId: null,
      cards: [
        { id: 1, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 1' },
        { id: 2, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 2' },
        { id: 3, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 3' },
        { id: 4, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 4' },
        { id: 5, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 5' },
        { id: 6, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 6' },
        { id: 7, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 7' },
        { id: 8, img: 'https://thumbs.dreamstime.com/b/medico-medico-maschio-illustrazione-di-vettore-78381665.jpg', name: 'Dottore 8' },
      ],
      cardPerView: 0,
    };
  },
  mounted() {
    this.initCarousel();
    this.autoPlay();
    this.$refs.carousel.addEventListener("mousedown", this.dragStart);
    this.$refs.carousel.addEventListener("mousemove", this.dragging);
    document.addEventListener("mouseup", this.dragStop);
    this.$refs.carousel.addEventListener("scroll", this.infiniteScroll);
    this.$refs.wrapper.addEventListener("mouseenter", this.clearAutoPlay);
    this.$refs.wrapper.addEventListener("mouseleave", this.autoPlay);
  },
  methods: {
    initCarousel() {
      const carousel = this.$refs.carousel;
      const firstCardWidth = carousel.querySelector(".card").offsetWidth;
      const carouselChildrens = [...carousel.children];
      this.cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

      
      carouselChildrens.slice(-this.cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
      });

      
      carouselChildrens.slice(0, this.cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
      });

      
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    },
    scrollLeft() {
      const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
      this.$refs.carousel.scrollLeft -= firstCardWidth;
    },
    scrollRight() {
      const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
      this.$refs.carousel.scrollLeft += firstCardWidth;
    },
    dragStart(e) {
      this.isDragging = true;
      this.$refs.carousel.classList.add("dragging");
      this.startX = e.pageX;
      this.startScrollLeft = this.$refs.carousel.scrollLeft;
    },
    dragging(e) {
      if (!this.isDragging) return;
      this.$refs.carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
    },
    dragStop() {
      this.isDragging = false;
      this.$refs.carousel.classList.remove("dragging");
    },
    infiniteScroll() {
      const carousel = this.$refs.carousel;
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
      } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }
      clearTimeout(this.timeoutId);
      if (!this.$refs.wrapper.matches(":hover")) this.autoPlay();
    },
    autoPlay() {
      if (window.innerWidth < 800 || !this.isAutoPlay) return;
      const firstCardWidth = this.$refs.carousel.querySelector(".card").offsetWidth;
      this.timeoutId = setTimeout(() => {
        this.$refs.carousel.scrollLeft += firstCardWidth;
      }, 5000);
    },
    clearAutoPlay() {
      clearTimeout(this.timeoutId);
    },
  },
  beforeDestroy() {
    this.$refs.carousel.removeEventListener("mousedown", this.dragStart);
    this.$refs.carousel.removeEventListener("mousemove", this.dragging);
    document.removeEventListener("mouseup", this.dragStop);
    this.$refs.carousel.removeEventListener("scroll", this.infiniteScroll);
    this.$refs.wrapper.removeEventListener("mouseenter", this.clearAutoPlay);
    this.$refs.wrapper.removeEventListener("mouseleave", this.autoPlay);
  },
};
</script>


<template>
    <div class="wrapper" ref="wrapper">
    <div class="carousel" ref="carousel">
      <ul class="carousel" v-for="card in cards" :key="card.id">
        <li class="card">
          <div class="img">
            <img :src="card.img" alt="" draggable="false" />
          </div>
          <h2>{{ card.name }}</h2>
        </li>
      </ul>
    </div>
    <i class="fa-solid fa-chevron-left" id="left" @click="scrollLeft"></i>
    <i class="fa-solid fa-chevron-right" id="right" @click="scrollRight"></i>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  display: flex;
  padding: 0 35px;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: rgb(62, 223, 169);
}

.wrapper {
  max-width: 1100px;
  width: 100%;
  position: relative;

  i {
  top: 50%;
  height: 50px;
  width: 50px;
  cursor: pointer;
  position: absolute;
  text-align: center;
  line-height: 50px;
  background: #c9c9c986;
  border-radius: 50%;
  transform: translateY(-50%);
  }
  i:first-child {
  left: -22px;
  }
  i:last-child {
  right: -22px;
  }

  .carousel {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: calc((100% / 3) - 12px);
    overflow-x: auto;
    gap: 16px;
    border-radius: 8px;
    scroll-behavior: smooth;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    &.no-transition {
      scroll-behavior: auto;
    }

    .card,
    .img {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .card {
      scroll-snap-align: start;
      height: 342px;
      list-style: none;
      background: #fff;
      cursor: pointer;
      padding-bottom: 15px;
      flex-direction: column;
      border-radius: 8px;
      width: 20rem;

      .img {
        background: #00c3a5;
        height: 148px;
        width: 148px;
        border-radius: 50%;

        img {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #fff;
        }
      }

      h2 {
        margin: 30px 0 5px;
      }

      span {
        color: #6a6d78;
        font-size: 1.31rem;
      }
    }
  }
}

/* RESPONSIVITY */
@media screen and (max-width: 900px) {
  .wrapper .carousel {
    grid-auto-columns: calc((100% / 2) - 10px);
  }
}

@media screen and (max-width: 600px) {
  .wrapper .carousel {
    grid-auto-columns: 100%;
  }
}
</style>