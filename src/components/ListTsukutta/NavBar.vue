<template lang="pug">
    nav
        b-navbar(toggleable="md" type="light" variant="light")
            b-navbar-brand(href="/list") リストつくったー
            b-navbar-nav.ml-auto
                b-navbar-nav
                    b-nav-item(href="https://twitter.com/tia__nn") by @tia__nn
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>

</style>