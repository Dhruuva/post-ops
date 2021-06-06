<template lang='pug'>
  v-main.grey.lighten-2
    v-container
      v-row.pa-5(justify="space-around")
        v-banner.pa-2.green.accent-2.rounded-xl(width="100%"  v-if="msg" single-line class="font-weight-bold"  elevation="9"  icon="mdi-human-greeting") {{msg}}
        v-sheet.mt-10.rounded-xl( width="100%"  :height="height"  elevation="5" )
          div.text-h3.mt-5(class="text-center indigo--text text--darken-6 font-weight-medium" ) Best publisher service !
        v-row.mt-2(justify="space-around")
          v-col( cols="12" sm="6")
            v-sheet.ml-2.rounded-sm( width="100%" height="250"  elevation="2" )
              v-layout.pt-10( align-center justify-space-around)
                div
                  v-chip.primary.lighten-3(  close close-icon="mdi-account" color="blue"
                  link  outlined) Users 
                  v-chip.red( link  outlined) {{users}}
              div.text-h5.pa-5(class="ml-5 text-center  brown--text text--darken-5" ) Start right now register and publish your thought for the world.    
          v-col( cols="12" sm="6") 
            v-sheet.rounded-sm.mr-5( width="100%" height="250"  elevation="2" )
              v-layout.pt-10( align-center justify-space-around)
                div
                  v-chip.primary.lighten-3(  close close-icon="mdi-printer" color="blue"
                  link  outlined) Posts 
                  v-chip.red( link  outlined) {{post}} 
              v-layout( align-center justify-space-around)
                div.text-h5.pa-5(class="ml-5 text-left  brown--text text--darken-5" ) Let others become know how things getting really on.    

          v-row.mt-5.pa-5(justify="space-around")
           
    v-dialog(v-model='loading' hide-overlay persistent width='300')
      v-card(color='primary lighten-3')
        v-card-text
          | Please stand by
          v-progress-linear.mb-0(indeterminate color='white')                
</template>

<script>

  
  export default {
    props: {
      msg: {
        type:String,
        default: () =>(null)  
      },
    },   
    data:()=>({
      name: 'Home',
      users: 0,
      post: 0,
      loading: false
     
    }),
    mounted(){
     
      this.getAllUser()
      this.allPost()
      let q = this.$route.query.token
      let qq = this.$route.query.refresh_token
      
      console.log(qq,"tokens .....",this.$route.query)
      if (q && qq){
        this.saveTokens('Bearer '+ q,qq);
        this.$router.push({ name: 'Welcome',params:{ token: 'Bearer '+ q}   });
      }

      let uri = window.location.search.substring(1); 
      let params = new URLSearchParams(uri);
      console.log(" uri params= ",params.get("token"));

       let url = window.location.href.split('?');
        if (url.length == 2){
           let vars = url[1].split('&');
           console.log(" url= ",vars);
        }
    },
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 130 
          case 'sm': return 130
          case 'md': return 90
          case 'lg': return 90
          case 'xl': return 90
          default: return 90
        }
      },
    },
    methods:{
      async getAllUser(){
        this.loading=true
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/total', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => {
              
               return response.json()})
            .then(data => {
             
              this.users=data.result
              this.loading=false
            })
            .catch((error) => {
              console.error('Post Error:', error);
              this.loading=false
             
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
             
              this.post=data.result

            })
            .catch((error) => {
              console.error('Post Error:', error);
             
        });
      }

    }
  }
</script>
