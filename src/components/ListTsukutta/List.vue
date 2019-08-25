<template lang="pug">
    div.list-card(@click="onClick")
        b-container.mt-3.mb-3
            b-row
                b-col.mr-auto(cols="auto")
                    .list-name {{info.name}}
                        b-badge(v-if="info.mode === 'private'").ml-3 鍵
                    .register-num {{info.member_count}} 人
                b-col(cols="auto")
                    b-button(variant="primary" @click.stop="onTLClick(info.uri)" tab) TL
            b-row
                b-col
                    b-button(variant="info" :href="'/list/setting/'+info.id_str") setting

</template>

<script>
    export default {
        name: "List",

        props: {
            info: Object
        },

        methods: {
            onClick() {
                document.location = '/list/member/'+this.info.id_str
            },

            onTLClick(uri) {
                window.open('https://twitter.com'+uri)
            }
        },
    }
</script>

<style scoped>
    .list-card {
        border: solid 1px lightgray;
        border-radius: 3px;
    }

    .list-card:hover {
        background-color: lightgray;
    }

    .list-name {
        font-size: 1.2em;
    }

    .register-num {
        color: gray;
    }
</style>