<template lang='pug'>
  v-main.red.lighten-5
    v-container(style="height:100%" fluid)
      v-row( no-gutters dense)
        v-col( cols="12" sm="6" md="6")
          v-card.ma-1(max-height='900' )
            v-card-text
              v-flex.mb-4
                v-avatar.mr-4(size='96')
                  img(src="@/assets/avatars/man.png" alt='Avatar')
                v-btn(small ) Change Avatar
              v-combobox(:items="searchHistory" :menu-props="{value: autoselectMenu}" @click:append="toggle")
                template( v-slot:item="{ item }")
                  v-avatar( color="grey" size="30" tile)
                    img(:src="item")
                v-icon( slot="append"  :color="autoselectMenu ? 'primary' : undefined" 
                    @click="toggle" 
                    v-text="autoselectMenu ? 'mdi-menu-up' : 'mdi-menu-down'")
              v-text-field(v-model='form.name' label='Name' single-line  solo)
              v-text-field(v-model='form.familyname' label='Family' single-line  solo)  
              v-text-field(v-model='form.email' label='Email' single-line disabled solo) 
              v-text-field(v-model='form.date' label='Date' single-line disabled solo) 
              v-combobox(v-model='authType' :items='roles' label='Member of' outlined dense hint="Select role" clearable hide-details) 
              v-text-field(v-model='form.OAuthProvider' label='OAuthProvider' hide-details solo single-line disabled)

            v-card-actions
              v-btn.secodary(@click='getUser' dark) Get user
              v-btn(color='success' :disabled = "noChanged==true" @click='updateUser()') 
                v-icon(left dark) mdi-check
                | Save Changes
              v-btn(color='primary' @click='getUser' :disabled = "noChanged==true" ) 
                v-icon(left dark) mdi-cancel
                | Decline 
              v-btn.primary(@click='test') test
        v-col( cols="12" sm="6" md="6")
          v-sheet.ma-1( align="left" justify="center"  )
            v-btn.info.ma-2(@click='getAllUser') Get All user  
            v-data-table.ma-2(:headers="userTbl.hd" :items="userTbl.rows" dense class="elevation-3" )
              template( slot="headers" slot-scope="props")
                tr
                  th(v-for="header in props.headers"  :key="header.text" :class="['th_my']") sdfdsf
              template(v-slot:item.profilePicture='{ item }')
                td.cell_my 
                  v-avatar( color="grey" size="30" tile)
                    v-img(v-if="item.profilePicture.length>0" :src="item.profilePicture" alt='Avatar')
                    v-img(v-else src="@/assets/avatars/man.png" alt='Avatar')  
              template(v-slot:item._id='{ item }')
                td.cell_my {{item._id}}  

      v-row( align="center" justify="center" style="height:50vh" no-gutters dense)
        v-col( cols="12" sm="12" md="12") 
          p {{Title}}
         
          v-text-field(label="token" :value="token")
          v-btn.secodary(@click='viewPayload(token)') Get user
          v-btn.info(@click='getAllUser') Get All user

          
</template>

<script>
  import jwt_decode from "jwt-decode";
  import user_types from './../../server/config/config'
  export default {
    props: {
      token: {
        type:String,
        default: () =>(null) // Ratio fontSize px to Width px, where t for time text,l for ticks text, k is for stroke
      },
    },   
    data:()=>({
      Title: "Welcome",
      form:{name:"",email:"",date:"",familyname:""},
      noChanged:true,
      authType:null,
      roles:[],
      userTbl:{hd:[{text:'user',value:'user'}],rows:[]},
      autoselectMenu: false,
      search: '',
      searchHistory: [
        "@/assets/avatars/worker.png",
        "@/assets/avatars/businessman.png",
      
      ]
    
    }),
     mounted() {
      this.$nextTick(function () {
        this.setRoleTypes(user_types)
        console.log( this.noChanged, "<----user_types ",user_types)
      })
    },
    watch: {
      form: {
        handler: function(v) {
          v.a=1
          this.noChanged= false
          //console.log (was ,'Form changed', this.noChanged,v )
        },
        deep: true
      },
      authType(){
        this.noChanged= false
      }
    },  

    computed: {
      // hasChanged () {
      //   return Object.keys(this.form).some(field => this.form[field] !== defaultForm[field])
      // }
    },
    
    methods:{
      toggle() {
        this.autoselectMenu = !this.autoselectMenu
      },
      setRoleTypes(o){
          while( this.roles.length>0) this.roles.pop()
          this.roles=Object.keys(o.permissionLevels).slice(0)
      },
      test(){
        let usr={
          "_id": `${this.form._id}`,
          "name": `${this.form.name}`,
          "email": `${this.form.email}`,
          "permissionLevel": user_types.permissionLevels[this.authType],
          "familyname": `${this.form.familyname}`

        }
         let l = JSON.stringify(usr);
          console.log( this.myIDis(this.token)," 333-----Test ", l)  
      },

      async getUser(){
        console.log( "<<<< this id token ", this.token,this.getToken())
        let uid = (this.token)? this.token: null
        if (!uid ) uid= this.getToken()
        if (!uid ){
          this.$router.push({ name: 'Login',params:{ msg: "Please relogin"}   });
          return
        }  
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
          console.log(data.success,'22Success:', data);
          //{error: "Need to pass a valid token"} 403
          if (data.error ){
            this.$router.push({ name: 'Login',params:{ msg: "Please relogin"}   });
            return
          }  
          this.form=data
          let fld = Object.keys(user_types.permissionLevels)
          let l = fld.map(a=>(user_types.permissionLevels[a] == data.permissionLevel)? a:null ).find(v=>v)
          console.log(l, "++++data.permissionLevel" )
          this.authType=(l)? l:null
          setTimeout( ()=> {this.noChanged=true}  ,1)
          
          return
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
           if (data.length>0 ){
            let h =Object.keys(data[0]).map(a=>({
              text:a,value:a, align: "center",divider:true
            }) ) 
            while (this.userTbl.hd.length>0) this.userTbl.hd.pop()
            this.userTbl.hd = [...h]
            while (this.userTbl.rows.length>0) this.userTbl.rows.pop()
            this.userTbl.rows=[...data]  
            console.log(h[1])
           }
        })
        .catch((error) => {
          console.error('Error121212:', error);
          return error
        });
      },
      async updateUser(){
         console.log(user_types.permissionLevels[this.authType], "<=== user_types ")  
          let usr={
            "_id": `${this.form._id}`,
            "name": `${this.form.name}`,
            "email": `${this.form.email}`,
            "permissionLevel": user_types.permissionLevels[this.authType],
            "familyname": `${this.form.familyname}`
          }
          let l = JSON.stringify(usr);
          console.log(user_types, " this id token ", l)  
          await fetch('http://localhost:5000/api/users/'+this.myIDis(this.token), {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':  this.token,
            }
            ,body: l,
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
<style lang="stylus">
  .cell_my
    width 50px !important
    overflow hidden
    color red
    font-size 19px
  .dataTable 
    font-size 19px !important
  th 
    width 50px  
  .th_my
    width 50px !important
    overflow hidden !important
    color red !important
    font-size 19px  !important
</style>