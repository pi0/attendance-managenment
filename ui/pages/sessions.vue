<template>
    <div>
        <b-table striped hover :items="sessions" :fields="fields">
            <template slot="session name" scope="item">
                {{item.name}}
            </template>
            <template slot="actions" scope="item">
                <b-btn size="sm" :href="'/session/' +  item.item._id + '/edit'">detail</b-btn>
            </template>
        </b-table>
        <div class="col-lg-6">
            <br>
            <b-form-input v-model="name" type="text" placeholder="enter the session name"></b-form-input>
            <br>
    
            <b-btn @click="newSession">New Session</b-btn>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sessions: [],
            fields: {
                name: {
                    label: 'session name',
                },
                actions: {
                    label: 'detail'
                }
            },
        }
    },
    async mounted() {
        await this.getSessions()
    },
    methods: {
        async getSessions() {
            this.sessions = (await this.$axios.get('sessions')).data
        },
        async newSession() {
            await this.$axios.post('sessions/new', {
                name: this.name,
            })
            await this.getSessions()
        },
    }
}
</script>