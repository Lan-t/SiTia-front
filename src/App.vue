<template lang="pug">
  div#app
    router-view
</template>

<script>
  export default {
    components:{
      NavBar: () => import('./components/ListTsukutta/NavBar')
    }
  }
</script>

<style>
</style>
