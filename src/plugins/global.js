import Vue from 'vue';
import jwt_decode from "jwt-decode";
export default Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
    sampleFunction(){
      alert('Global Functions')
    },
    setUserInfo() {
      if (localStorage.getItem('LoggedUser')) {
        let u = JSON.parse(localStorage.getItem('LoggedUser'))
       
        return  u.user.name+", Welcome!"
      } else {
        console.log("layoutMembers Ops Now User")
        return null
      }
    },
    getToken() {
      if (localStorage.getItem('LoggedUser')) {
        let u = JSON.parse(localStorage.getItem('LoggedUser'))
        //console.log("###layoutMembers Global Now User",u.jwt)
        return  u.jwt
      } else {
        console.log("layoutMembers Ops Now User")
        return null
      }
    },
    myIDis(){
      let token = this.getToken()
      let u =(token && token.split(' ').length>1)? jwt_decode(token.split(' ')[1]):jwt_decode(token);
          return u.id
    },
  }
})
