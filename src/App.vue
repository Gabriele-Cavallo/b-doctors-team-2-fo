<script>
import AppHeader from './components/AppHeader.vue';
export default {
  components: {
    AppHeader,
  }
}
</script>

<template>
  <AppHeader></AppHeader>
 
  <router-view></router-view>
  <AppFooter/>
</template>

<style lang="scss">
  @use './style/generic';
</style>