<template>
  <b-navbar toggleable="lg" type="dark" style="background: #000">
    <b-navbar-brand href="#" >
      <h1 class="logo"><span class="logo_text">Cricket</span><span class="logo_num">999</span></h1>
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto" style="flex-direction: row">
      <b-nav-item-dropdown
        id="my-nav-dropdown"
        text="Dropdown"
        toggle-class="nav-link-custom"
        right
      >
        <template v-slot:button-content>
          <span class="h2"><b-icon icon="person-fill"></b-icon></span>

        </template>
        <b-dropdown-item>One</b-dropdown-item>
        <b-dropdown-item>Two</b-dropdown-item>
        <b-dropdown-divider></b-dropdown-divider>
        <b-dropdown-item @click.prevent="signOut">LogOut</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item id="burger"
           :class="{ 'active' : isBurgerActive }"
           >
        <a @click.prevent="toggle"  title="Menu" style="margin-top: -5px">
          <p class="h3" style="color: white"><b-icon icon="three-dots-vertical"></b-icon></p>

        </a>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
  import firebase from 'firebase'
  import { store, mutations } from "../store";
  export default {
    data() {
      return {
        itemsCount: 42,displayName:''
      }
    },
    computed: {
      isBurgerActive() {
        console.log(store.isNavOpen)
        return store.isNavOpen
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.displayName=user;
          //console.log(this.displayName);
        }else{
          this.$router.replace({
            name: "Welcome"
          });
        }
      });
    },
    methods: {
      toggle() {
        mutations.toggleNav()
        //store.isNavOpen = !store.isNavOpen;
        console.log(store.isNavOpen);
      },
      signOut() {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$router.replace({
              name: "Login"
            });
          });
      }
    }
  }
</script>
<style>
  .hidden {
    visibility: hidden;
  }

  button {
    cursor: pointer;
  }

  /* remove blue outline */
  button:focus {
    outline: 0;
  }

  .burger-button {
    position: relative;
    height: 30px;
    width: 32px;
    display: block;
    z-index: 999;
    border: 0;
    border-radius: 0;
    background-color: transparent;
    pointer-events: all;
    transition: transform .6s cubic-bezier(.165,.84,.44,1);
  }

  .burger-bar {
    background-color: #130f40;
    position: absolute;
    top: 50%;
    right: 6px;
    left: 6px;
    height: 2px;
    width: auto;
    margin-top: -1px;
    transition: transform .6s cubic-bezier(.165,.84,.44,1),opacity .3s cubic-bezier(.165,.84,.44,1),background-color .6s cubic-bezier(.165,.84,.44,1);
  }

  .burger-bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
  }

  .burger-bar--2 {
    transform-origin: 100% 50%;
    transform: scaleX(.8);
  }

  .burger-button:hover .burger-bar--2 {
    transform: scaleX(1);
  }

  .no-touchevents .burger-bar--2:hover {
    transform: scaleX(1);
  }

  .burger-bar--3 {
    transform: translateY(6px);
  }

  /*#burger.active .burger-button {
    transform: rotate(-180deg);
  }
*/
  #burger.active .burger-bar {
    background-color: #fff;
  }

  /*#burger.active .burger-bar--1 {
    transform: rotate(45deg)
  }*/

  #burger.active .burger-bar--2 {
    opacity: 0;
  }

  /*#burger.active .burger-bar--3 {
    transform: rotate(-45deg)
  }*/
</style>
