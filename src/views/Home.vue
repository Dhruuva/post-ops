<template lang='pug'>
  v-main.grey.lighten-2
    v-container
      v-row.pa-5(justify="space-around")
        v-sheet.mt-10.rounded-xl( width="100%"  height="490"  elevation="13" )
          div.text-h3.mt-5(class="text-center indigo--text text--darken-6 font-weight-medium" ) Best publisher service !
          div.text-h5.pa-2(class="ml-5 text-left  brown--text text--darken-5" ) Start right now register and publish your thought for the world. Let others become know how things getting really on. 
          v-row.mt-5.pa-5(justify="space-around")
            v-col( cols="12" md="6")
              v-layout( align-center justify-space-around)
                div
                  v-chip.primary.lighten-3(  close close-icon="mdi-account" color="blue"
                  link  outlined) Users 
                  v-chip.red( link  outlined) {{users}}
            v-col( cols="12" md="6")
               v-layout( align-center justify-space-around)
                div
                  v-chip.primary.lighten-3(  close close-icon="mdi-printer" color="blue"
                  link  outlined) Posts 
                  v-chip.red( link  outlined) {{post}}   
</template>

<script>

  
  export default {
   
    data:()=>({
      name: 'Home',
      users: 0,
      post: 0
    }),
    mounted(){
      this.getAllUser()
      this.allPost()
    },
    components: {
      
     
    },
    methods:{
      async getAllUser(){
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/total', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => {
               console.log(response.status);
               return response.json()})
            .then(data => {
              console.log(data.result,' Post add Success:', data);
              this.users=data.result
            

            })
            .catch((error) => {
              console.error('Post Error:', error);
             
        });
      },
      async allPost(){
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/posts/total', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data.result,' Post add Success:', data);
              this.post=data.result

            })
            .catch((error) => {
              console.error('Post Error:', error);
             
        });
      }

    }
  }
</script>
