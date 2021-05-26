<template lang='pug'>
  v-main.grey.lighten-2
    v-container
      v-row.pa-5(justify="space-around")
        v-sheet.mt-10.rounded-xl( width="100%"  height="350"  elevation="13" )
          div.text-h2.pa-2(class="ma-3 text-center brown--text text--lighten-2 font-weight-medium" ) Best publisher service !
          div.text-body-1.pa-10(class="ml-5 text-left  indigo--text text--darken-5" ) Start right now register and publish your thought for the world. Let others become know how things getting really on. 
          v-col( colms="2")
            v-btn.primary.lighten-3( @click='getUserPost' dark ) Posts 
          v-col( colms="2")
            v-btn.primary.darken-3( @click='killUserPost'  ) Posts         
</template>

<script>

  
  export default {
   
    data:()=>({
      name: 'Home',
    }),
    components: {
      
     
    },
    methods:{
      async getUserPost(){
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/posts/'+'609401213f498c70b6086d06', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(' Post add Success:', data);
            

            })
            .catch((error) => {
              console.error('Post Error:', error);
             
        });
      },
      async killUserPost(){
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/posts/'+'609401213f498c70b6086d06', {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(' Post add Success:', data);
            

            })
            .catch((error) => {
              console.error('Post Error:', error);
             
        });
      }

    }
  }
</script>
