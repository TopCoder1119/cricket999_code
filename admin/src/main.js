import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from "./store";
var cors = require('cors')
import * as firebase from "firebase";
Vue.use(cors)

Vue.config.performance = true
Vue.use(CoreuiVue)
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
window.axios = require('axios');
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
window.Event = new Vue();
new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  },
})
