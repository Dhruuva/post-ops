<template lang='pug'>
v-app#layoutGuest
  v-app-bar(app)

    v-app-bar-nav-icon(@click='drawer = !drawer')
    v-toolbar-title Publish
    v-spacer
    v-btn(icon value='login' to="/login")
      v-icon mdi-login
    v-btn(icon disabled)
      v-icon mdi-text-search
    v-btn(icon disabled)
      v-icon mdi-dots-vertical  
    v-chip.float-right.info( class="ma-2" x-small) v  {{appVersion}}
  v-navigation-drawer(v-model='drawer' fixed temporary)
    v-list-item
      v-list-item-content
        v-list-item-title.title
          | Publish
        v-list-item-subtitle
          | work
    v-divider
    v-list(nav dense)
      v-list-item-group(v-model='group' active-class='deep-purple--text text--accent-4')
        v-list-item(value='home' to="/")
          v-list-item-icon
            v-icon mdi-home
          v-list-item-title Home  
  router-view            
</template>

<script>
export default {
  name: 'app',
  components: {
   
  },
  data: () => ({
    drawer: false,
    group: null,
 }),
  computed: {
      appVersion () {
        return process.env.VUE_APP_VERSION
      }
  }
}
</script>
<style lang="stylus">
#layoutGuest
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align left
  color #2c3e50
  
</style>