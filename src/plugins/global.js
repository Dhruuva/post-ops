import Vue from 'vue';

export default Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    sampleFunction(){
      alert('Global Functions')
    },
    setUserInfo() {
      if (localStorage.getItem('LoggedUser')) {
        let u = JSON.parse(localStorage.getItem('LoggedUser'))
        console.log("layoutMembers ", u.user.name)
        return  u.user.name+", Welcome!"
      } else {
        console.log("layoutMembers Ops Now User")
        return null
      }
    },
    getToken() {
      if (localStorage.getItem('LoggedUser')) {
        let u = JSON.parse(localStorage.getItem('LoggedUser'))
        return  u.user.jwt
      } else {
        console.log("layoutMembers Ops Now User")
        return null
      }
    }
  }
})
