<template>
    <div id="app">
        <UserForm />
        <CardList :users="$store.getters.users" />
    </div>
</template>

<script>
    import UserForm from './components/UserForm'
    import CardList from './components/CardList'

    export default {
        name: 'app',
        components: {
            UserForm,
            CardList
        },
        methods: {

        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
