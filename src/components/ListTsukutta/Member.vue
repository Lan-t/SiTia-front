<template lang="pug">
    .member-card(:class="{selected: selected}")
        b-container.mt-2.mb-2
            b-row
                b-col(cols="3" md="2" lg="1").text-center
                    b-img(:src="info.profile_image_url_https" fluid-grow)

                b-col(cols="9" md="10" lg="11").mr-auto
                    .name
                        span {{info.name}}
                        span.screen-name(@click.stop="openUser") @{{info.screen_name}}
                    .description {{info.description}}
</template>

<script>
    export default {
        name: "Member",

        props: {
            info: Object,
            selected: Boolean,
        },

        methods: {
            openUser() {
                window.open('https://twitter.com/'+this.info.screen_name)
            }
        },

        created() {
        }
    }
</script>

<style scoped>
    .member-card {
        border: solid 1px lightgray;
        border-radius: 3px;
    }

    .member-card:hover {
        background-color: lightgray;
    }

    .selected {
        background-color: lightcyan;
    }

    .selected:hover {
        background-color: lightblue;
    }

    .name {
        font-size: 1.2em;
    }

    .screen-name {
        color: gray;
    }

    .screen-name:hover {
        color: deepskyblue;
    }
</style>