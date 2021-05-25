<template lang='pug'>
  component(:is="layout")
</template>

<script>
import LayoutGuest from './components/LayoutGuest.vue'
import LayoutMembers from './components/LayoutMembers.vue'

export default {
  name: 'app',
  components: {
   LayoutGuest, LayoutMembers

  },
  data: () => ({
    drawer: false,
    layout: LayoutGuest,
  }),
  mounted() {
    // let externalScript = document.createElement('script')
    // externalScript.setAttribute('src', 'https://unpkg.com/we-do-chart')
    // document.head.appendChild(externalScript)
  },
  watch: {
    $route(to) {
     
      if (to.meta.layout !== undefined) {
        let isAuth = this.getToken()
      
        if (isAuth && to.name=="Home") {
          this.layout = "LayoutMembers"
        } else {
          this.layout = to.meta.layout
        }
      } else {
        this.layout = "LayoutGuest" // this is default layout if route meta is not set
      }
    },
  },

}
</script>

<style lang="stylus">

#inspire
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50
  
</style>

