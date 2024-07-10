<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            activeText: null
        };
    },
    methods: {
        toggleBorder(textNumber) {
            // Se clicchi su un testo già attivo, rimuovi i bordi
            if (this.activeText === textNumber) {
                this.activeText = null;
            } else {
                this.activeText = textNumber;
            }
        }
    }
}
</script>

<template>

        <!-- <header class="shadow-lg">
        <div class="container d-flex justify-content-around">
            <div>
                <h1>BD<i class="fa-solid fa-stethoscope"></i>ctors</h1>
            </div>
            <ul ref="wrapper" class="nav align-self-center">
                <li @click="toggleBorder(1)" :class="{ 'bordered': activeText === 1 }" class="nav-item">
                    <router-link class="nav-link link-dark" aria-current="page" :to="{name: 'home'}">Homepage</router-link>
                </li>
                <li @click="toggleBorder(2)" :class="{ 'bordered': activeText === 2 }" class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'about'}">About Us</router-link>
                </li>
                <li @click="toggleBorder(3)" :class="{ 'bordered': activeText === 3 }" class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'our-doctors'}">I nostri dottori</router-link>
                </li>
            </ul>
        </div>
    </header> -->

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <router-link class="nav-link link-dark ms-h1" aria-current="page" :to="{name: 'home'}">BD<i class="fa-solid fa-stethoscope"></i>ctors</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li @click="toggleBorder(1)" :class="{ 'bordered': activeText === 1 }" class="nav-item">
                    <router-link class="nav-link link-dark" aria-current="page" :to="{name: 'home'}">Homepage</router-link>
                </li>
                <li @click="toggleBorder(2)" :class="{ 'bordered': activeText === 2 }" class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'about'}">About Us</router-link>
                </li>
                <li @click="toggleBorder(3)" :class="{ 'bordered': activeText === 3 }" class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'our-doctors'}">I nostri dottori</router-link>
                </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

.ms-h1{
    font-size: 50px;
}
i{
    color: $primary-color;
}
.bordered {
  border-bottom: 2px solid $primary-color;
}

.navbar-toggler{
   border-color: $primary-color;
}

.navbar-toggler {
color: $primary-color;
}
</style> 