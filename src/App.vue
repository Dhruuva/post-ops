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
  watch: {
    $route(to) {
      // set layout by route meta
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout
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
