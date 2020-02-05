<template>
  <div style="height: 100%;padding: 30px">
    <div style="height: 40%;padding-top: 100px">
      <router-link :to="'/cricket'/*+this.event_id*/"><button type="button" class="bg1 mybtn  btn-block  waves-effect"><img src="../assets/img/cricket_ball.png" width="50">Cricket</button></router-link>

    </div>
    <div style="height: 60%;padding-top: 100px">
      <router-link :to="'/luckyNumber/'/*+this.luckyNum_id*/"><button type="button" class="mybtn btn-block aves-effect bg1"><img src="../assets/img/LuckyNumbers/luck_btn5.png" width="50" style="border-radius: 50%">Lucky Number</button></router-link>

    </div>
  </div>

</template>

<script>
  import firebase from "firebase";

  export default {
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {

    }
  }
</script>
