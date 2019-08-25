<template lang="pug">
    div#app
        nav-bar
        router-view
</template>

<script>
    export default {
        name: 'app',
        components:{
            NavBar: () => import('../../components/ListTsukutta/NavBar')
        }
    }
</script>

<style>
</style>
