<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background: #000">
      <b-navbar-brand href="#" >
        <h1 class="logo"><span class="logo_text">Cricket</span><span class="logo_num">999</span></h1>
      </b-navbar-brand>
    </b-navbar>
    <div class="container" style="height: 70vh;margin-top: 20px">
      <div style="display: flex">
        <div style="flex: 1;text-align: center;padding: 10px">
          <a href="javascript:void(0)" class="btn bg-black waves-effect waves-light" style="width: 100%">Android</a>
        </div>
        <div style="flex: 1;text-align: center;padding: 10px">
          <a href="javascript:void(0)" class="btn bg-black waves-effect waves-light" style="width: 100%">IOS</a>
        </div>
      </div>
      <div style="height:80%;display: table">
        <div style="display: table-cell;vertical-align: middle">
          <div style="text-align:center;font-size:18.0pt;font-family:Calibri,sans-serif;mso-fareast-font-family:
            +mn-ea;mso-bidi-font-family:+mn-cs;color:white;mso-font-kerning:12.0pt;
            mso-effects-shadow-color:black;mso-effects-shadow-alpha:38.0%;mso-effects-shadow-dpiradius:
            4.0pt;mso-effects-shadow-dpidistance:3.07pt;mso-effects-shadow-angledirection:
            5460000;mso-effects-shadow-align:topleft;mso-effects-shadow-pctsx:100.0%;
            mso-effects-shadow-pctsy:100.0%;mso-effects-shadow-anglekx:0;mso-effects-shadow-angleky:
            0;mso-ansi-language:EN-IN">
            BETTING ADDICTION IS DANGEROUS FOR WEALTH.
            SO WE ARE PROVIDING THE REAL BETTING
            EXCITEMENT IN NO MONEY OR FREE COINS.
          </div>
          <div style="text-align: right">
          </div>
        </div>

        <!--<video autoplay height="100%" loop muted width="100%">
          <source src="{{asset('public/admin/title.mp4')}}" type="video/mp4">

          Your browser does not support the video tag.
        </video>-->
      </div>
      <div style="flex: 1;text-align: center;padding: 10px">
        <router-link to="/login" class="btn bg-black waves-effect waves-light" style="width: 50%">Get Start</router-link>
      </div>
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
      /*firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.displayName=user;
          console.log(this.displayName);
          this.$router.replace({
            name: "Home"
          });
        }

      });*/
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
