<template>
  <div>
    <TopBar/>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <RightSideBar>
    </RightSideBar>
  </div>
</template>
<script>
  import TopBar from './TopBar.vue'
  import RightSideBar from "./RightSideBar";
  export default {
    components :{
      TopBar,RightSideBar
    }
  }
</script>
