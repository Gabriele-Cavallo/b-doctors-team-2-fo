<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header>
        <div class="container">
            <ul class="nav nav-underline">
                <li class="nav-item">
                    <router-link class="nav-link link-dark" aria-current="page" :to="{name: 'home'}">Homepage</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link link-dark" :to="{name: 'about'}">About Us</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>