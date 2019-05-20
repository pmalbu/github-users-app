<template>
    <div class="card-container">
        <img alt="avatar" v-bind:src="avatar_url" />
        <div>
            <a @click="deleteGithubUser(id)" class="delete-user">x</a>
            <div class="name">{{ name }}</div>
            <div>{{ blog }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardItem",
        props: {
            blog: String,
            name: String,
            avatar_url: String,
            id: Number
        },
        methods: {
            deleteGithubUser(id) {
                this.$store.commit('deleteGithubUser', id)
            }
        }
    }
</script>

<style scoped>
    .card-container {
        margin: 20px;
        position: relative;
    }
    .card-container img {
        width: 70px;
    }
    .card-container .name {
        font-weight: bold;
    }

    .delete-user {
        color: red;
        border: 2px solid red;
        border-radius: 50%;
        line-height: 0.5;
        font-size: 20px;
        position: absolute;
        left: 48%;
        top: -5px;
        cursor: pointer;
    }
</style>