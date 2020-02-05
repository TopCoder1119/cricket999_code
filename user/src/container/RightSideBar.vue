<template>
  <div class="sidebar">
    <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen"
           class="sidebar-panel">
        <a @click="closeSidebarPanel" type="button" class="burger-button " title="Menu" style="margin-top: -5px">
          <p class="h2" style="color: white"><b-icon icon="x-circle"></b-icon></p>
        </a>
        <b-tabs content-class="mt-3" fill>
          <b-tab title="Tab 1" active><b-card-text>Tab contents 1</b-card-text></b-tab>
          <b-tab title="Tab 2"><b-card-text>Tab contents 2</b-card-text></b-tab>
        </b-tabs>
      </div>
    </transition>
  </div>
</template>
<script>
  import { store, mutations } from "../store";
  export default {
    data: () => ({

    }),
    computed:{
      isPanelOpen(){
        return store.isNavOpen
      }
    },
    methods: {
      closeSidebarPanel() {
        mutations.toggleNav()
      },

    }
  }
</script>
<style>
  .slide-enter-active,
  .slide-leave-active
  {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(100%);
    transition: all 150ms ease-in 0s
  }

  .sidebar-backdrop {
    background-color: rgba(0,0,0,.5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color:  rgb(51, 47, 47);
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 5px 20px 2rem 20px;
    width: 300px;
  }
</style>
