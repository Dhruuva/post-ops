<template lang="pug">
  v-main.grey.lighten-3
    v-container
      v-row( no-gutters dense)
        v-col.pa-2( cols="12" sm="5" md="5")
          v-card.ma-1(max-height='900' :loading = "loading"  :class="`${(dialog)?'noCard':'yesCard'}`")
            v-toolbar.primary.darken-1( dense  dark)
            v-form(align="center" justify="center" ref='form' )  
              v-text-field.mx-4.mt-4(v-model="title"  prepend-icon="mdi-page-layout-header"  label="Topic"  outlined  placeholder="Topic"  dense :rules='nameRules' required )
              v-textarea.mx-4( v-model="content" outlined name="postMsg" label="Write message here" value="Ogog " :rules='msgRules' required  )
            v-card-actions
              v-btn.primary.darken-2( @click='submitForm' dark ) Post
        v-col.pa-2( cols="12" sm="7" md="7")
          v-card(:loading = "loading")
            v-toolbar.info.lighten-2( dense  dark)
               v-btn.secondary.lighten-3( @click='loadPosts' dark small) Get posts  
            v-list(dense subheader  three-line)
              template(v-for='(item, index) in items')
                v-list-item(:key='item._id')
                  template(v-slot:default='{ active }')
                    v-list-item-content
                      v-list-item-icon
                        v-avatar.mr-2( color="grey" size="30" fab)
                          v-img(v-if="item.author.profilePicture" :src="item.author.profilePicture" alt='Avatar')
                          v-img(v-else src="@/assets/avatars/man.png" alt='Avatar')
                        v-list-item-title.primary--text(v-text='item.author.name' )
                      v-list-item-subtitle(v-text='item.title' color='red')
                      v-list-item-subtitle(v-text='item.content')
                    v-list-item-action
                      v-btn( icon  color='yellow darken-3' :disabled="item.author._id!==myID" @click="editPost(item)")
                        v-icon | mdi-pencil
                      v-btn(icon  color='red lighten-1' @click='killPost(item._id)' :disabled="item.author._id!==myID")
                        v-icon | mdi-delete

                v-divider(v-if='index < items.length - 1' :key='index')      
      v-dialog.pa-2(v-model="dialog"  max-width="490" )
        v-card(max-height='900' :loading = "loading" )
          v-toolbar.primary.lighten-3( dense  dark) {{dialog}}
          v-form(align="center" justify="center" ref='form2' lazy-validation)  
            v-text-field.mx-4.mt-4(v-model="title"  prepend-icon="mdi-page-layout-header"  label="Topic"  outlined  placeholder="Topic"  dense :rules='nameRules' required )
            v-textarea.mx-4(style="white-space: pre-line"  v-model="content" outlined name="postMsg" label="Write message here" value="Ogog " :rules='msgRules' required  )
             
          v-card-actions
            v-btn.primary.lighten-3( @click='updatePost' dark ) Update        
</template>

<script>
  export default{
    name: 'post',
    data:()=>({
      title:"",
      content:"",
      loading:false,
      validToken:null,
      myID:"",
      cPost:null,
      dialog: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 4) || 'Name must be more than 4 characters',
      ], 
      msgRules: [
        v => !!v || 'No empty post',
        v => (v && v.length <= 255) || 'Name must be less than 255 characters',
      ], 
      items: [
        
      ]               
    }),
    mounted() {
      this.$nextTick(function () {
        
        this.myID=this.myIDis();

        
        
      })
    },
    watch:  {
      dialog(v) {
        if (!v) {
          this.content = ""
          this.title = ""
          setTimeout( ()=> {this.$refs.form.resetValidation()}  ,50)
        
        }
      }
    },
    methods:{
      async submitForm () {

        const valid = this.$refs.form.validate();
        if(valid) { 
          if (!this.validToken )  this.validToken = this.getToken()
        
          if (!this.validToken ){
            this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
            return
          }
          this.loading = true
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/posts/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization':  this.validToken
              },
              body: JSON.stringify({
                  "title": `${this.title}`,
                  "content": `${this.content}`
                }),
              })
              .then(response => response.json())
              .then(data => {
                if (data.error  &&  data.error == "Need to pass a valid token"){
                  localStorage.removeItem("LoggedUser"); 
                  this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                  return
                }  
              
                this.items.unshift(data.data)
                if (this.dialog) this.dialog=false
                this.loading = false
              })
              .catch((error) => {
                console.error('Post Error:', error);
                this.loading = false
              });
             
          } //valid end     
      //__________   
      },
      async loadPosts () {
        if (!this.validToken )  this.validToken = this.getToken()
        if (!this.validToken ){
          localStorage.removeItem("LoggedUser"); 
          this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
          return
        }
        this.loading = true
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/posts/feed/', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              
              }
            })
            .then(response => response.json())
            .then(data => {
             
              while (this.items.length>0) this.items.pop()
              this.items=[...data]   
              this.loading = false

            })
            .catch((error) => {
              console.error('Post Error:', error);
              this.loading = false
            });
           
      //__________   
      } ,
      async killPost(id) {  
        
        
        this.loading = true
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/posts/'+id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':  this.validToken,
            }
           
           })
            .then(response => response.json())
            .then(data => {
              
              if (data.error  &&  data.error == "Need to pass a valid token"){
                localStorage.removeItem("LoggedUser"); 
                this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                return
              }  
              let i = this.items.findIndex(a=>a._id==id);
              this.items.splice(i,1)
              this.loading = false
            })
            .catch((error) => {
              console.error('Error:', error);
              this.loading = false
              return error
            });
      } ,
      async editPost(p) { 
        this.cPost = p //{...p}
        this.content=p.content;
        this.title =p.title
        
        this.dialog = true

      },
      async updatePost () {
        let p = {
            "content": `${this.content}`,
            "title": `${this.title}`}  
        const valid = this.$refs.form.validate();
        if(valid) { 
          if (!this.validToken )  this.validToken = this.getToken()
          
          if (!this.validToken ){
            localStorage.removeItem("LoggedUser"); 
            this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
            return
          }
          this.loading = true
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/posts/'+this.cPost._id, {
                  method: 'PATCH',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization':  this.validToken
                  },
                  body: JSON.stringify(p),
              })
              .then(response => response.json())
              .then(data => {
                if (data.error  &&  data.error == "Need to pass a valid token"){
                  this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                  return
                }  
               
                this.cPost.content=this.content
                this.cPost.title=this.title
                this.$refs.form.reset()
                if (this.dialog) this.dialog=false
                this.loading = false
              })
              .catch((error) => {
                console.error('PATCH Error:', error);
                this.loading = false
              });
             
          } //valid end     
      //__________   
      },
    }
  }
</script>

<style lang="stylus">
  .noCard
    filter: blur(9px);
    visibility: hidden;
  .yesCard
    visibility: visible;  
</style>