<script>
    export default{
        name: 'AppLoader',
    }
</script>

<template>
    <div class="loading justify-content-center d-flex align-items-center">Loading...</div>
</template>

<style scoped lang="scss">
    @use '../style/partials/variables' as *;
.loading{
    height: 100vh;
    font-weight: bold;
    font-size: 40px;
}
</style>