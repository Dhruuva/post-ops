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
                v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/google' @click.end='loading=true' )
                  v-icon mdi-google
                v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/mailru' @click.end='loading=true')
                  v-icon mdi-at
                v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/github' @click='loading=true')
                  v-icon mdi-github 
                v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/facebook' disabled)
                  v-icon mdi-facebook  
          v-divider            
          v-card-actions 
            v-subheader  DON'T HAVE AN ACCOUNT?   
            v-btn(color='indigo lighten-2' to="signup" elevation="3") SIGN UP 
      v-row( align="center" justify="center" style="height:50vh" no-gutters dense)
        v-dialog.pa-2(v-model="errorDlg"  max-width="490" )
          v-card( v-if="errorDlg" max-height='900'  )
            v-toolbar.primary.darken-1.white--text( dense class="font-weight-medium") Error
            v-card-title( class="headline")  {{ error.msg }}
            v-card-text {{error.dtl }}
            v-card-actions 
              v-btn.secondary.lighten-3( @click.stop='errorDlg=false'  ) Close 
      v-dialog(v-model='loading'  persistent width='300')
        v-card(color='primary lighten-3')
          v-card-text
            | Please stand by
            v-progress-linear.mb-0(indeterminate color='white')               
           
</template>

<script>
  import jwt_decode from "jwt-decode";
 
  export default {
    data: () => ({
      error:{msg:'',dtl:'.'},
      errorDlg: false,
      loading: false,
      show: false,
      text: "Ole",
      name: "todhruva@mail.ru",
      pwd: "qwerexQ1"
    }),
  
    mounted() {
      this.$nextTick(function () {
        let q = this.$route.query.token
        let qq = this.$route.query.refresh_token
        
        if (q && qq){
          this.saveTokens('Bearer '+ q,qq);
          this.$router.push({ name: 'Welcome',params:{ token: 'Bearer '+ q}   });
        }
      })
    },
    methods: {
      async login (){
        this.loading=true
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/auth/login', {
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
         
          let u = jwt_decode(data.token.split(' ')[1]);
       
          localStorage.setItem('LoggedUser',JSON.stringify({jwt:data.token,uJwt:data.refresh_token,user:u}));
          this.$route.meta.visible=true
          
          //this.$router.options.routes.forEach(a => (console.log(a)))
          this.$router.options.routes.forEach(a => {
            if (a.meta && a.meta.visible) a.meta.visible=true
          })
          this.$router.push({ name: 'Welcome',params:{ token: data.token}   });
        })
        .catch((error) => {
          this.loading=false
          this.error = {msg:'Bad user ID or password',dtl:"please try again"}
          this.errorDlg=true
          return error
        });
       
      },
      saveTokens(token,uJwt){
        let u =(token.split(' ').length>1)? jwt_decode(token.split(' ')[1]):jwt_decode(token);
        
        localStorage.setItem('LoggedUser',JSON.stringify({jwt:token,uJwt:uJwt,user:u}));
      },
      
    }

    //~~~~~~~~~~~~~~~
  }  
</script>