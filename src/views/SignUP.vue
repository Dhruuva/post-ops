<template lang="pug">
v-main.grey.lighten-2
  v-container.fluid(fluid)
    v-row.row(justify='center' align='center' style='height: 80vh')
      v-card.mx-auto(max-width='544' elevation="12"  shaped width="400")
        v-toolbar(color='secondary' dark flat)
          v-toolbar-title Login form 
        v-card-text   
          v-form(align="center" justify="center" ref='form' lazy-validation)
            v-text-field(label='Name' name='name' prepend-icon='mdi-account' type='text' :rules='nameRules' required)
            v-text-field(label='Email' name='email' prepend-icon='mdi-email' type='text' :rules='emailRules' required)  
            v-text-field( v-model="password" label='Password' name='password' prepend-icon='mdi-lock' type='password' required hint="At least 6 characters" :rules='[minRules,passwordRules]' )
            v-text-field( v-model="rePassword" label="Re-enter Password" name='repeat' prepend-icon='mdi-lock' required :type="show1 ? 'text' : 'password'" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="show1 = !show1" :rules='[minRules,passwordConfirmationRule]') 
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
              v-btn(icon)
                v-icon mdi-google
              v-btn(icon)
                v-icon mdi-facebook
              v-btn(icon)
                v-icon mdi-github 
                        
</template>

<script>
  export default {
    data: () => ({
      password:'',
      rePassword:'',
      agCheckbox:false,
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
           v =>( v && v.length >= 6) || 'Name must be more than 6 characters',
        ],  
    }),
    computed: {
        passwordConfirmationRule() {
          return this.password === this.rePassword || 'Password must match'
        }
    },
    methods: {
      submitForm () {
        this.$refs.form.validate();
      },
    },

  }
</script>