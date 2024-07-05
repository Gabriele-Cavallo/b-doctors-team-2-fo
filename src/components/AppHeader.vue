<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            activeText: null // Stato condiviso per gestire quale testo ha i bordi
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
    <header class="shadow-lg">
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
    </header>
</template>

<style lang="scss" scoped>
@use '../style/partials/variables' as *;

h1{
    color: $primary-color;
    font-size: 50px;
}
i{
    color: $primary-color;
}

.bordered {
  border-bottom: 2px solid $primary-color;
}
</style> 