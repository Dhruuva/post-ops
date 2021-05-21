<template lang='pug'>
  v-main.red.lighten-5
    v-container(style="height:100%" fluid)
      v-row( no-gutters dense)
        v-col( cols="12" sm="5" md="5")
          v-card.ma-1(max-height='900' )
            v-card-text
              v-avatar.d-flex.mr-4(size='150')
                v-img(v-if="form.profilePicture.length>0" :src="form.profilePicture" alt='Avatar')
                v-img(v-else src="@/assets/avatars/man.png" alt='Avatar')    
              span {{avatar}}    
              v-btn.ma-2(v-if="autoselectMenu!==true" small @click="toggle") Change Avatar
              v-flex.ma-2(v-else shrink style="width:105px")
                v-select( v-model="avatar" :items="avatars" :menu-props="{value: autoselectMenu, auto: false, overflowY: false, maxHeight: 320}" autowidth  )
                  template( v-slot:item="{ item }")
                    v-avatar( color="grey" size="100" @click="toggle" tile)
                      img( v-if="item.f" :src='require(`@/assets/avatars/${item.f}`)' @click="setAvatar(item.f)" alt='Avatar')
                      img( v-else src='@/assets/avatars/man.png'  alt='Avatar')
              v-text-field(v-model='form.name' label='Name' single-line  solo)
              v-text-field(v-model='form.familyname' label='Family' single-line  solo)  
              v-text-field(v-model='form.email' label='Email' single-line disabled solo) 
              v-text-field( label='Date' single-line disabled solo :value="form.date | toShortTime") 
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
        v-col( cols="12" sm="7" md="7")
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
              template(v-slot:item.__v='{ item }')
                v-btn.primary.ma-1(x-small @click="deleteUser(item._id)" :disabled = 'canRemove') Remove
              template(v-slot:item.date='{ item }')
                td.truncate(nowrap) {{item.date | toShortTime}}       

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
      form:{profilePicture:"", name:"",email:"",date:"",familyname:"",permissionLevel:0},
      noChanged:true,
      authType:null,
      roles:[],
      userTbl:{hd:[{text:'user',value:'user'}],rows:[]},
      avatar:null,
      autoselectMenu: false,
      search: '',
      avatars:[
        {f:'businessman.png'},
        {f:'worker.png'},
        {f:'boy.png'},
        {f:'smile.png'},
      ]
    
    }),
     mounted() {
      this.$nextTick(function () {
        this.setRoleTypes(user_types)
        this.getUser()
        console.log( this.noChanged, "<----user_types ",user_types)
      })
    },
    watch: {
      form: {
        handler: function(v) {
          v.a=1
          this.noChanged= false
          console.log (v ,'Form changed', this.noChanged,v )
        },
        deep: true
      },
      authType(){
        this.noChanged= false
      },
      avatar(){
         console.log("Avatarv==>", this.avatar )
      }
    },  

    computed: {
      // hasChanged () {
      //   return Object.keys(this.form).some(field => this.form[field] !== defaultForm[field])
      // }
      canRemove(){
       
        let rtn =( this.form.permissionLevel && this.form.permissionLevel>2000)? false:true
        console.log( this.permissionLevel , "<== this.permissionLevel", rtn, " +++")
        return rtn
      }
    },
    
    methods:{
      setAvatar(a){
        this.form.profilePicture=require(`@/assets/avatars/${a}`)
        console.log(a)
      },
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
        let validToken = (this.token)? this.token: null
        if (!validToken ){ 
          validToken = this.getToken()
        }
          console.log( " Get token from store @@@" ,this.getToken())
        if (!validToken ){
          this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
          return
        }  
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/'+this.myIDis(validToken), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':  validToken,

          },
         })
        .then(response => response.json())
        .then(data => {
          console.log(data.success,'22Success:', data);
          //{error: "Need to pass a valid token"} 403
          if (data.error  &&  data.error == "Need to pass a valid token"){
            this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
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
          let u =(token.split(' ').length>1)? jwt_decode(token.split(' ')[1]):jwt_decode(token);
          return u.id
      },
      viewPayload(val){//dev
        console.log(val.split(' ')[0])
        //console.log(window.atob(val.split(' ')[1]))
        let u = jwt_decode(val.split(' ')[1]);
        console.log("viewPayload " , u.id )
      },
      async getAllUser(){
        console.log( " this id token ", process.env.VUE_APP_BACKEND_URL)
        await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/', {
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
              text:a,value:a, align: "center",divider:true,width:100
            }) ).filter(a=> ["OAuthId","OAuthProvider","permissionLevel"].indexOf(a.text)<0)
            console.log(h)
            //let d=["OAuthId","OAuthProvider"]
            while (this.userTbl.hd.length>0) this.userTbl.hd.pop()
            this.userTbl.hd = [...h]
            while (this.userTbl.rows.length>0) this.userTbl.rows.pop()
            this.userTbl.rows=[...data]  
            
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
            "familyname": `${this.form.familyname}`,
            "profilePicture": `${this.form.profilePicture}`
          }
          let l = JSON.stringify(usr);
          console.log(user_types, " this id token ", l)  
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/'+this.myIDis(this.token), {
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
              if (data.error  &&  data.error == "Need to pass a valid token"){
                this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                return
              }  
              console.log('Success:', data);
               
            })
            .catch((error) => {
              console.error('Error121212:', error);
              return error
            });
          

      },
      async deleteUser(id){
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/'+id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':  this.token,
            }
           
           })
            .then(response => response.json())
            .then(data => {
              if (data.error  &&  data.error == "Need to pass a valid token"){
                this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                return
              }  
              console.log('Success:', data);
              let i = this.userTbl.rows.findIndex(a=>a._id==id)
              console.log('IIIIIIIIIIIIII:', i);
              this.userTbl.rows.splice(i,1)
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
    width-min 40px !important
    overflow hidden
    color red
    font-size 11px
  .dataTable 
    font-size 19px !important
  th 
    width 50px  
  .th_my
    width 50px !important
    overflow hidden !important
    color red !important
    font-size 19px  !important
  .truncate 
    overflow hidden
    text-overflow ellipsis
    white-space nowrap 
    font-size 11px
    width 50px !important
    width-min 40px !important
</style>