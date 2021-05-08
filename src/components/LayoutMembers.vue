<template lang='pug'>
v-app(id="layoutMembers")
  v-system-bar(app)
    v-spacer
    v-icon mdi-account-alert
    v-icon mdi-circle
  v-app-bar(app)
    v-app-bar-nav-icon(@click='drawer = !drawer')
    v-toolbar-title Application
    v-spacer
    v-btn(icon value='login' to="/login")
      v-icon mdi-login-variant
    v-btn(icon)
      v-icon mdi-heart
    v-btn(icon)
      v-icon mdi-dots-vertical  
  v-navigation-drawer(v-model='drawer' fixed temporary)
    v-list-item
      v-list-item-content
        v-list-item-title.title
          | Application
        v-list-item-subtitle
          | subtext
    v-divider
    v-list(nav dense)
      v-list-item-group(v-model='group' active-class='deep-purple--text text--accent-4')
        v-list-item(value='home' to="/")
          v-list-item-icon
            v-icon mdi-home
          v-list-item-title Home
        v-list-item(value='about' to="/about" )
          v-list-item-icon
            v-icon mdi-account
          v-list-item-title Account
  
  router-view            
</template>

<script>

export default {
  name: 'layoutMembers',
  components: {
   
  },
  data: () => ({
    drawer: false,
    group: null,
 }),
}
</script>
<style lang="stylus">

  
</style>          