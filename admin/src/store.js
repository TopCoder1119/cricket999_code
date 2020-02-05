import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        user: {
            loggedIn: false,
            data: null
        },
    },
    getters: {
        user(state){
            return state.user
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    role: user.role,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        },
    }
});

export const store = Vue.observable({
    user_data:{},
    isNavOpen: false
});

export const mutations = {
    /*setIsNavOpen(yesno) {
      store.isNavOpen = yesno;
    },*/
    toggleNav() {
        store.isNavOpen = !store.isNavOpen;
        console.log(store.isNavOpen)
    },
    setUser(user){
        store.user_data=user
    },
    getUser(){
        return store.user_data=user
    }
};
