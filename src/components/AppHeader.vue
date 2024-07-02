<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header class="shadow-lg">
        <div class="container d-flex justify-content-around">
            <div>
                <h1>BD<i class="fa-solid fa-stethoscope"></i>ctors</h1>
            </div>
            <ul class="nav nav-underline align-self-center">
                <li class="nav-item">
                    <router-link class="nav-link link-dark" aria-current="page" :to="{name: 'home'}">Homepage</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'about'}">About Us</router-link>
                </li>
                <li class="nav-item">
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
}
i{
    color: $primary-color;
}
</style> 