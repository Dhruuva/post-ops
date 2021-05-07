<template lang='pug'>
  v-main.red.lighten-5
    v-container(style="height:100%")
      v-row( align="center" justify="center" style="height:50vh" no-gutters dense)
        v-col( cols="12" sm="10" md="12") 
          p {{Title}}
          v-btn.primary(@click='getUser') Get user
          v-text-field(label="token" :value="token")
          v-btn.secodary(@click='viewPayload(token)') Get user
          v-btn.info(@click='getAllUser') Get All user
          
</template>

<script>
  import jwt_decode from "jwt-decode";
  export default {
    props: {
      token: {
        type:String,
        default: () =>(null) // Ratio fontSize px to Width px, where t for time text,l for ticks text, k is for stroke
      },
    },   
    data:()=>({
      Title: "Welcome"
    
    }),
    methods:{
      async getUser(){
        console.log( " this id token ", this.token)
        await fetch('http://localhost:5000/api/users/'+this.myIDis(this.token), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':  this.token,
          },
         })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          
        })
        .catch((error) => {
          console.error('Error121212:', error);
          return error
        });

      },
      myIDis(token){
          let u = jwt_decode(token.split(' ')[1]);
          return u.id
      },
      viewPayload(val){//dev
        console.log(val.split(' ')[0])
        //console.log(window.atob(val.split(' ')[1]))
        let u = jwt_decode(val.split(' ')[1]);
        console.log("viewPayload " , u.id )
      },
      async getAllUser(){
        console.log( " this id token ", this.token)
        await fetch('http://localhost:5000/api/users/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':  this.token,
          },
         })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          
        })
        .catch((error) => {
          console.error('Error121212:', error);
          return error
        });
      },

    }

  }
</script>