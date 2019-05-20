<template>
    <div>
        <CardItem v-for="user in users" :key="user.id"
                  :blog="user.blog"
                  :name="user.name"
                  :avatar_url="user.avatar_url"
                  :id="user.id"
        />
    </div>
</template>

<script>
    import CardItem from './CardItem'

    export default {
        name: "CardList",
        components: {
            CardItem
        },
        props: {
            users: Array,
        }
    }
</script>

<style scoped>

</style>