<template lang="pug">
    b-container.mt-2.mb-5
        template(v-if="info!==undefined")
            h5
                span name: {{info.name}}
                b-badge(v-if="info.mode === 'private'").ml-3 鍵
            div description: {{info.description}}

            b-button(size="sm" variant="primary" :href="'/list/setting/'+$route.params.id") Setting


        h3.mt-3 ユーザー選択

        h5(@click="memberOpen = !memberOpen")
            span.mr-1 {{memberOpen ? 'v' : '>'}}
            span NowMember
        template(v-if="memberOpen")
            member(v-for="i in members" :info="users[i]" :selected="selectedUser.includes(i)"
                @click.native="selectUser(i)")

        h5(@click="followingOpen = !followingOpen")
            span.mr-1 {{followingOpen ? 'v' : '>'}}
            span Following
        template(v-if="followingOpen")
            member(v-for="i in following" :info="users[i]" :selected="selectedUser.includes(i)"
                @click.native="selectUser(i)")

        h5(@click="followerOpen = !followerOpen")
            span.mr-1 {{followerOpen ? 'v' : '>'}}
            span Follower
        template(v-if="followerOpen")
            member(v-for="i in follower" :info="users[i]" :selected="selectedUser.includes(i)"
                @click.native="selectUser(i)")

        b-button.submit(size="lg" @click.stop="submit" :disabled="submitDisable") submit
</template>

<script>
    export default {
        name: "EditMember",

        components: {
            Member: () => import('../../components/ListTsukutta/Member')
        },

        data: () => ({
            info: undefined,
            users: {},
            members: [],
            following: [],
            follower: [],

            addMember: [],
            subMember: [],

            memberOpen: false,
            followingOpen: false,
            followerOpen: false,

            submitDisable: false,
        }),

        methods: {
            get(url, params, process) {
                new Promise(async () => {
                    let next_cursor = undefined
                    let a = 0

                    while (1) {
                        params.cursor = next_cursor

                        let r = await this.$axios.get(url, {
                            params
                        }).catch(console.dir)

                        process(r.data)

                        if (r.data.response.next_cursor === 0) {
                            break
                        }
                        next_cursor = r.data.response.next_cursor_str

                        a += 1
                        if (a === 2) {
                            break
                        }
                    }
                })
            },

            load() {
                this.$axios.get('/api/wrap/lists/show.json?list_id=' + this.$route.params.id).then(r => {
                    this.info = r.data.response
                })

                this.members = []
                this.following = []
                this.follower = []

                this.get('/api/wrap/lists/members.json', {
                    list_id: this.$route.params.id,
                    count: 5000,
                }, (res) => {
                    for (let user of res.response.users) {
                        this.users[user.id_str] = user
                        this.members.push(user.id_str)
                    }
                })

                this.get('/api/wrap/friends/list.json', {
                    count: 200,
                }, (res) => {
                    for (let user of res.response.users) {
                        this.users[user.id_str] = user
                        this.following.push(user.id_str)
                    }
                })

                this.get('/api/wrap/followers/list.json', {
                    count: 200,
                }, (res) => {
                    for (let user of res.response.users) {
                        this.users[user.id_str] = user
                        this.follower.push(user.id_str)
                    }
                })
            },

            selectUser(i) {
                let selected = this.selectedUser.includes(i)
                if (selected) {
                    if (this.addMember.includes(i)) {
                        this.addMember.splice(this.addMember.indexOf(i), 1)
                    } else {
                        this.subMember.push(i)
                    }
                } else {
                    if (this.subMember.includes(i)) {
                        this.subMember.splice(this.subMember.indexOf(i), 1)
                    } else {
                        this.addMember.push(i)
                    }
                }
            },

            async submit() {
                const qs = require('qs')

                this.submitDisable = true

                if (!this.subMember.equals([]))
                    await this.$axios.post('/api/wrap/lists/members/destroy_all.json', qs.stringify({
                        list_id: this.$route.params.id,
                        user_id: this.subMember,
                    }, {arrayFormat: 'comma'})).then(console.dir).catch(console.dir)

                if (!this.addMember.equals([]))
                    await this.$axios.post('/api/wrap/lists/members/create_all.json', qs.stringify({
                        list_id: this.$route.params.id,
                        user_id: this.addMember,
                    }, {arrayFormat: 'comma'})).then(console.dir).catch(console.dir)

                await this.$axios.get('/api/wrap/cache_clear', {params: {re: 'lists/'}})
                this.load()
                this.submitDisable = false

                document.location = '/list/list'
            },
        },

        computed: {
            selectedUser() {
                let member = JSON.parse(JSON.stringify(this.members))
                for (let i of this.addMember) {
                    member.push(i)
                }
                for (let i of this.subMember) {
                    member.splice(member.indexOf(i), 1)
                }
                return member
            },
        },

        created() {
            this.load()
        }
    }
</script>

<style scoped>
    .submit {
        position: fixed;
        right: 1em;
        bottom: 1em;
    }
</style>