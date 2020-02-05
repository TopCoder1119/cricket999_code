<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show.sync="show"
  >
    <div class="c-sidebar-brand">
      <a class="" href="https://coreui.io/" rel="noopener" target="_blank">

        <div class="c-sidebar-brand-full">
          <h1 class="logo"><span class="logo_text">Cricket</span><span class="logo_num">999</span></h1>
        </div>
        <div class="c-sidebar-brand-minimized">
          <h1 class="logo"><span class="logo_text">C</span><span class="logo_num">9</span></h1>
        </div>

      </a>
    </div>

    <CRenderFunction flat :content-to-render="nav"/>
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="minimize = !minimize"
    />
  </CSidebar>
</template>

<script>
import nav from './_nav'

export default {
  name: 'TheSidebar',
  data () {
    return {
      minimize: false,
      nav,
      show: 'responsive'
    }
  },
  mounted () {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
  }
}
</script>
