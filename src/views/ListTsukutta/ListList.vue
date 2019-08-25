<template lang="pug">
    b-container.mt-5
        b-row
            b-col(cols="auto").mr-auto
                h3 リスト一覧
            //b-col(cols="auto")
                button new
        .lists
            list(v-for="i in lists" :info="i")
</template>

<script>
    export default {
        name: "ListList",

        components: {
            List: () => import('../../components/ListTsukutta/List')
        },

        data: () => ({
            lists: []
        }),

        methods: {
            load() {
                this.lists = []
                this.$axios.get('/api/wrap/lists/list.json').then(r => {
                    let res = r.data.response
                    this.lists = res
                })
            }
        },

        created() {
            this.load()
        }
    }
</script>

<style scoped>
    .lists {
    }
</style>