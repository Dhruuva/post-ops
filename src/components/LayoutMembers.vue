<template lang='pug'>
v-app(id="layoutMembers")
  v-system-bar(app)
    v-spacer
    v-chip(class="ma-1" small) {{msg}}
  v-app-bar(app)
    v-app-bar-nav-icon(@click='drawer = !drawer')
    v-toolbar-title Application
    v-spacer
    v-btn(icon value='login' to="/welcome")
      v-avatar(size=50)  
        v-img.mr-3( :src="photo" alt='Avatar')
    v-btn(icon value='login' to="/login")
     v-icon mdi-logout
      
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
        v-list-item(value='post' to="/post" )
          v-list-item-icon
            v-icon mdi-post
          v-list-item-title Post  
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
    msg: "ok",
    group: null,
    photo:"@/assets/avatars/man.png",
  }),
  mounted() {
    this.setUserInfo()
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
   methods:{
    setUserInfo() {
      if (localStorage.getItem('LoggedUser')) {
        let u = JSON.parse(localStorage.getItem('LoggedUser'))
        console.log("layoutMembers ", u.user.name)
        this.msg= u.user.name+", Welcome!"
        if (u.user.profilePicture.length>0){
          this.photo = u.user.profilePicture
        }
      } else {
        console.log("layoutMembers Ops Now User")
      }
    }
  }
}
</script>
<style lang="stylus">

  
</style>          