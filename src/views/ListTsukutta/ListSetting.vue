<template lang="pug">
    b-container.mt-5
        h3 リスト情報
        b-input-group(size="md" prepend="ListName" :append="`${name.length}/25`").mt-3
            b-form-input(v-model="name")
        b-input-group(size="md" prepend="詳細" :append="`${description.length}/100`").mt-3
            b-form-textarea(v-model="description")
        b-input-group(size="md").mt-3
            b-input-group-prepend(is-text)  鍵
            b-input-group-append(is-text)
                b-form-checkbox(v-model="private")
        b-row.mt-3
            b-col.save.text-center.border-top.border-bottom.border-primary(@click="submit")
                div 保存
            b-col.delete.text-center.border-top.border-bottom.border-danger(@click="destroy")
                div 削除
</template>

<script>
    export default {
        name: "ListSetting",

        components: {
            List: () => import('../../components/ListTsukutta/List')
        },

        data: () => ({
            id: undefined,
            info: undefined,
            name: '',
            description: '',
            private: undefined,

            processing: false,
        }),

        methods: {
            load() {
                this.$axios.get('/api/wrap/lists/show.json?list_id=' + this.id).then(r => {
                    this.info = r.data.response
                    this.name = this.info.name
                    this.description = this.info.description
                    this.private = this.info.mode === 'private'
                })
            },

            async submit() {
                if (this.processing) return
                this.processing = true

                const qs = require('qs')

                let params = {
                    list_id: this.info.id_str
                }
                if (this.name !== this.info.name)
                    params.name = this.name
                if (this.description !== this.info.description)
                    params.description = this.description
                if (this.private !== (this.info.mode === 'private'))
                    params.mode = this.private ? 'private' : 'public'

                await this.$axios.post('/api/wrap/lists/update.json', qs.stringify(params, {arrayFormat: 'comma'})).then(console.dir).catch(console.dir)

                await this.$axios.get('/api/wrap/cache_clear', {
                    params: {
                        re: 'lists/list.json'
                    }
                })
                await this.$axios.get('/api/wrap/cache_clear', {
                    params: {
                        re: 'lists/show.json'
                    }
                })

                document.location = '/list/list'
                this.processing = false
            },

            async destroy() {
                if (this.processing) return
                this.processing = true

                const qs = require('qs')

                await this.$axios.post('/api/wrap/lists/destroy.json', qs.stringify({
                    list_id: this.info.id_str
                }))

                await this.$axios.get('/api/wrap/cache_clear', {params: {
                    re: 'lists/list.json'
                    }})

                document.location = '/list/list'
                this.processing = false
            }
        },


        created() {
            this.id = this.$route.params.id
            this.load()
        }
    }
</script>

<style scoped>
    .save, .delete {
        font-size: 1.2em;
    }

    .save:hover, .delete:hover {
        background-color: lightgray;
    }
</style>