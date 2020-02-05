<template>
  <router-view></router-view>

</template>

<script>
  //import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'App',
  mounted() {
    Event.$on('toast',(title='Alert',msg,variant='primary',toaster='b-toaster-bottom-right',append=false)=>{
      console.log(msg)
      this.$bvToast.toast(msg, {
        title: title,
        toaster: toaster,
        solid: true,
        appendToast: append,
        variant: variant
      })
    })
  },

}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
