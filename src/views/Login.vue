<template lang="pug">
v-main.grey.lighten-3
    v-container(style="height:100%")
      v-row( align="center" justify="center" style="height:70vh" no-gutters dense)
        v-card.mx-auto(max-width='544' elevation="12"  shaped width="400")
          
          v-toolbar(color='secondary' dark flat)
            v-toolbar-title Login form 
          v-card-text   
            v-form(align="center" justify="center")
              v-text-field( v-model='name' label='Login' name='login' prepend-icon='mdi-account' type="text")
              v-text-field( v-model='pwd' label='Password' name='password' prepend-icon='mdi-lock' type='password')
          v-card-actions.mt-n5
            v-btn.flex(color='orange lighten-2' elevation="12" @click="login") Login
          v-row.mt-3
            v-col 
              v-divider
            v-subheader.mt-n3 or  
            v-col 
              v-divider   
          v-card-actions
            v-row(align="center" justify="center")
              v-btn-toggle(v-model='text' tile color='deep-purple accent-3' group)
                v-btn(icon href='http://localhost:5000/api/auth/google' )
                  v-icon mdi-google
                v-btn(icon href='http://localhost:5000/api/auth/mailru')
                  v-icon mdi-at
                v-btn(icon href='http://localhost:5000/api/auth/github')
                  v-icon mdi-github 
                v-btn(icon href='http://localhost:5000/api/auth/facebook')
                  v-icon mdi-facebook  
          v-divider            
          v-card-actions 
            v-subheader  DON'T HAVE AN ACCOUNT?   
            v-btn(color='indigo lighten-2' to="signup" elevation="3") SIGN UP 
           
           
</template>

<script>
  import jwt_decode from "jwt-decode";
  // import mdiRu from "@/assets/mail_ru_logo.ico";
  export default {
    data: () => ({
      show: false,
      text: "Ole",
      name: "todhruva@mail.ru",
      pwd: "qwerexQ1"
    }),
    // components: {
    //     'mdi-ru':mdiRu
    // },
    mounted() {
      this.$nextTick(function () {
        let q = this.$route.query.token
        let qq = this.$route.query.refresh_token
        console.log( qq, "  <----Redirect login ", q)
        if (q && qq){
          this.saveTokens('Bearer '+ q,qq);
          this.$router.push({ name: 'Welcome',params:{ token: 'Bearer '+ q}   });
        }
      })
    },
    methods: {
      async login (){
        console.log(" Logins")
        //let data = JSON.stringify({"email": "sdf@dfg.ru", "password": "Textual content"});
       //JSON.stringify({email: "sdf@dfg.ru", password: 'Textual content'})
       //'http://localhost:5000/api/auth/login2'
       // 'http://localhost:3000/getViewLog'
        const rawResponse = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
              "email": `${this.name}`,
              "password": `${this.pwd}`
          }),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          //const userId = '123'
          let u = jwt_decode(data.token.split(' ')[1]);
          console.log(u)
          localStorage.setItem('LoggedUser',JSON.stringify({jwt:data.token,uJwt:data.refresh_token,user:u}));
          this.$route.meta.visible=true
          
          this.$router.options.routes.forEach(a => (console.log(a)))
          this.$router.options.routes.forEach(a => {
            if (a.meta && a.meta.visible) a.meta.visible=true
          })
          this.$router.push({ name: 'Welcome',params:{ token: data.token}   });
        })
        .catch((error) => {
          console.error('Error121212:', error);
          return error
        });
        console.log("login=",rawResponse);
      },
      saveTokens(token,uJwt){
        let u =(token.split(' ').length>1)? jwt_decode(token.split(' ')[1]):jwt_decode(token);
        console.log(" saveTokens Goog",u)
        localStorage.setItem('LoggedUser',JSON.stringify({jwt:token,uJwt:uJwt,user:u}));
      },
      async toGoogle (){
        console.log(" toGoogle")
        await fetch('http://localhost:5000/api/auth/google', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8'
          },
        })
        .then(response => response.json())
        .then(data => {
           console.error(' Data:', data);
         })
        .catch((error) => {
          console.error('Error Google:', error);
          return error
        }); 
      }

    }

    //~~~~~~~~~~~~~~~
  }  
</script>