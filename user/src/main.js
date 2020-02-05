// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
var cors = require('cors')
import * as firebase from "firebase";
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(cors)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.config.productionTip = false
window.axios = require('axios');

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.css'
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyBgAfsuhHwz_zo8dEKpgU247wimnupt1aw",
  authDomain: "cricket999-ef2de.firebaseapp.com",
  databaseURL: "https://cricket999-ef2de.firebaseio.com",
  projectId: "cricket999-ef2de",
  storageBucket: "cricket999-ef2de.appspot.com",
  messagingSenderId: "60633363219",
  appId: "1:60633363219:web:819d09d2b75b8f5618a0e6",
  measurementId: "G-X7LVMCB8VP"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(user => {
  if (user){
    store.dispatch("fetchUser", user);
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
