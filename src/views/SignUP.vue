<template lang="pug">
v-main.grey.lighten-2
  v-container.fluid(fluid)
    v-row.row(justify='center' align='center' style='height: 80vh')
      v-card.mx-auto(max-width='544' elevation="12"  shaped width="400")
        v-toolbar(color='secondary' dark flat)
          v-toolbar-title Login form 
        v-card-text   
          v-form(align="center" justify="center" ref='form' lazy-validation)
            v-text-field( v-model="name" label='Name' name='name' prepend-icon='mdi-account' type='text' :rules='nameRules' required)
            v-text-field( v-model="email" label='Email' name='email' prepend-icon='mdi-email' type='text' :rules='emailRules' required)  
            v-text-field( v-model="password" label='Password' name='password' prepend-icon='mdi-lock' type='password' required hint="At least 6 characters" :rules='minRules' )
            v-text-field( v-model="rePassword" label="Re-enter Password" name='repeat' prepend-icon='mdi-lock' required :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" :rules='repeatPasswordRules') 
            v-checkbox(v-model='agCheckbox' :rules="[v => !!v || 'You must agree to continue!']" label='I agree with Terms and Conditions' required )
        v-card-actions.mt-n5
          v-btn.flex(color='orange lighten-2' elevation="12"  @click="submitForm") Register
        v-row.mt-3
          v-col 
            v-divider
          v-subheader.mt-n3 or  
          v-col 
            v-divider   
        v-card-actions
          v-row(align="center" justify="center")
            v-btn-toggle.mt-n3( tile color='deep-purple accent-3' group)
              v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/google' )
                v-icon mdi-google
              v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/mailru')
                v-icon mdi-at
              v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/github')
                v-icon mdi-github 
              v-btn(icon href=process.env.VUE_APP_BACKEND_URL+'api/auth/facebook' disabled)
                v-icon mdi-facebook  
    v-row( align="center" justify="center" style="height:50vh" no-gutters dense)
      v-dialog.pa-2(v-model="errorDlg"  max-width="490" )
        v-card( v-if="errorDlg" max-height='900'  )
          v-toolbar.primary.darken-1.white--text( dense class="font-weight-medium") Error
          v-card-title( class="headline")  {{ error.msg }}
          v-card-text {{error.dtl }}
          v-card-actions 
            v-btn.secondary.lighten-3( @click.stop='errorDlg=false'  ) Close                      
</template>

<script>
  export default {
    data: () => ({
      error:{msg:'',dtl:'.'},
      errorDlg: false,
      password:'',
      rePassword:'',
      agCheckbox:false,
      name: "",
      email: "",
      show1:false,
      nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail must be valid',
       ],
      passwordRules: [
          v => !!v || 'Password is required',
          v => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least lowercase letter, one number, a special character and one uppercase letter',
        ],
       minRules: [
           v =>( v && v.length >= 6) || ' must be more than 6 characters',
        ],  
    }),
    computed: {
        passwordConfirmationRule() {
          return (this.password === this.rePassword) || 'Password must match'
        },
        repeatPasswordRules() {
          return [
            (v) => !!v || 'Password is required',
            (v) => (v && v.length >= 6) || ' must be more than 6 characters',
            (v) => (v === this.password) || 'Password must match',
          ];
        },

    },
    methods: {
      async submitForm () {
        const valid = this.$refs.form.validate();
        if(valid) {      
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/auth/register', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                  "name": `${this.name}`,
                  "email": `${this.email}`,
                  "password": `${this.password}`,
                  "password2": `${this.rePassword}`
                }),
              })
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
                if (data.email && data.email=="Email already exists"){
                    this.error = {msg:'Email already exists',dtl:"Try another one"}
                    this.errorDlg=true
                    return 
                }
                this.$router.push({ name: 'Home',params:{ msg: `Hello, ${this.name}  please login now.`}   });
              })
              .catch((error) => {
                this.error = {msg:'Bad user ID or password',dtl:"please try again"}
                this.errorDlg=true
                return error
              });
             
        }
      },
    },

  }
</script>