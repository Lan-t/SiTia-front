<template lang="pug">
    b-container.mt-2.mb-2
        b-row
            b-col
                h1 ああああ
                b-button(type="primary" @click="onClick") LogIn
</template>

<script>
    export default {
        name: "Index",

        methods: {
            onClick() {
                let next_url = '/list/list'
                let req_url = '/api/twitter_login/'

                this.$axios.get(req_url, {params: {next: next_url}}).then(res => {
                    location = res.data.url
                }).catch(err => {
                    if (err.response.status === 303) {
                        console.log(err)
                        let url = err.response.data.url
                        if (url !== undefined) {
                            location = url
                            return
                        }
                    }
                    alert('ログインエラー\n' + err.response.data.message)
                })
            }
        }
    }
</script>

<style scoped>

</style>