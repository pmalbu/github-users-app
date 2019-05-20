import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'

const vuexLocalStorage = new VuexPersist({
    key: 'github-app', // a unique key to store the data
    storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: []
    },
    mutations: {
        addGithubUser(state, user) {
            state.users.push(user);
        },
        deleteGithubUser(state, id) {
            state.users = state.users.filter(user => user.id !== id)
        },
    },
    actions: {},
    getters: {
        users: state => state.users,
    },
    plugins: [vuexLocalStorage.plugin]
});