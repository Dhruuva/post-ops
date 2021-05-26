<template lang='pug'>
  v-main.grey.lighten-3
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
              v-col( cols="12" sm="10" md="12")
                v-btn.secodary.ma-1(@click='getUser' dark) Get user
                v-btn.ma-1(color='success' :disabled = "noChanged==true" @click='updateUser()') 
                  v-icon(left dark) mdi-check
                  | Save Changes
                v-btn.ma-1(color='primary' @click='getUser' :disabled = "noChanged==true" ) 
                  v-icon(left dark) mdi-cancel
                  | Decline 
              
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
      v-dialog.pa-2(v-model="errorDlg"  max-width="490" )
        v-card( v-if="errorDlg" max-height='900'  )
          v-toolbar.primary.darken-1.white--text( dense class="font-weight-medium") Error
          v-card-title( class="headline")  {{ error.msg }}
          v-card-text {{error.dtl }}
          v-card-actions 
            v-btn.secondary.lighten-3( @click.stop='errorDlg=false'  ) Close  
</template>

<script>
  import jwt_decode from "jwt-decode";
  import user_types from './../../server/config/config'
  export default {
    props: {
      token: {
        type:String,
        default: () =>(null)  
      },
    },   
    data:()=>({
      error:{msg:'',dtl:'.'},
      errorDlg: false,
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
      
      })
    },
    watch: {
      form: {
        handler: function(v) {
          v.a=1
          this.noChanged= false
         
        },
        deep: true
      },
      authType(){
        this.noChanged= false
      },
      
    },  

    computed: {
      // hasChanged () {
      //   return Object.keys(this.form).some(field => this.form[field] !== defaultForm[field])
      // }
      canRemove(){
       
        let rtn =( this.form.permissionLevel && this.form.permissionLevel>2000)? false:true
        
        return rtn
      }
    },
    
    methods:{
      setAvatar(a){
        this.form.profilePicture=require(`@/assets/avatars/${a}`)
        
      },
      toggle() {
        this.autoselectMenu = !this.autoselectMenu
      },
      setRoleTypes(o){
          while( this.roles.length>0) this.roles.pop()
          this.roles=Object.keys(o.permissionLevels).slice(0)
      },
      async getUser(){
         let validToken = (this.token)? this.token: null
          if (!validToken ){ 
            validToken = this.getToken()
          }
           
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
          
          //{error: "Need to pass a valid token"} 403
          if (data.error  &&  data.error == "Need to pass a valid token"){
            this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
            return
          }  
          this.form=data
          let fld = Object.keys(user_types.permissionLevels)
          let l = fld.map(a=>(user_types.permissionLevels[a] == data.permissionLevel)? a:null ).find(v=>v)
       
          this.authType=(l)? l:null
          setTimeout( ()=> {this.noChanged=true}  ,1)
          
          return
        })
        .catch((error) => {
         this.error = {msg:'Fatal error',dtl:error}
         this.errorDlg=true
        });

      },
      myIDis(token){
          let u =(token.split(' ').length>1)? jwt_decode(token.split(' ')[1]):jwt_decode(token);
          return u.id
      },
    
      async getAllUser(){
       
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
         
           if (data.length>0 ){
            let h =Object.keys(data[0]).map(a=>({
              text:a,value:a, align: "center",divider:true,width:100
            }) ).filter(a=> ["OAuthId","OAuthProvider","permissionLevel"].indexOf(a.text)<0)
           
            //let d=["OAuthId","OAuthProvider"]
            while (this.userTbl.hd.length>0) this.userTbl.hd.pop()
            this.userTbl.hd = [...h]
            while (this.userTbl.rows.length>0) this.userTbl.rows.pop()
            this.userTbl.rows=[...data]  
            
           }
        })
        .catch((error) => {
          this.error = {msg:'Fatal error',dtl:error}
          this.errorDlg=true
        });
      },
      async updateUser(){
        let validToken = (this.token)? this.token: null
          if (!validToken ){ 
            validToken = this.getToken()
          }
           
          if (!validToken ){
            this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
            return
        }  
       
          let usr={
            "_id": `${this.form._id}`,
            "name": `${this.form.name}`,
            "email": `${this.form.email}`,
            "permissionLevel": user_types.permissionLevels[this.authType],
            "familyname": `${this.form.familyname}`,
            "profilePicture": `${this.form.profilePicture}`
          }
          let l = JSON.stringify(usr);
         
          await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/'+this.myIDis(validToken), {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':  validToken,
            }
            ,body: l,
           })
            .then(response => response.json())
            .then(data => {
              if (data.error  &&  data.error == "Need to pass a valid token"){
                this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                return
              }  
             this.noChanged=true
               
            })
            .catch((error) => {
              this.error = {msg:'Fatal error',dtl:error}
              this.errorDlg=true
            });
          

      },
      async deleteUser(id){
          let validToken = (this.token)? this.token: null
            if (!validToken ){ 
              validToken = this.getToken()
            }
             
            if (!validToken ){
              this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
              return
          }  

          await fetch(process.env.VUE_APP_BACKEND_URL+'api/users/'+id, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization':  validToken,
            }
           
           })
            .then(response => response.json())
            .then(data => {
              if (data.error  &&  data.error == "Need to pass a valid token"){
                this.$router.push({ name: 'Login',params:{ msg: "Please reLogin"}   });
                return
              }  else if (data.error ){
                this.error = {msg: data.error, dtl:data.err}
                this.errorDlg=true
              } else {
                let i = this.userTbl.rows.findIndex(a=>a._id==id)
                this.userTbl.rows.splice(i,1)
              }
              
            })
            .catch((error) => {
              this.error = {msg:'Fatal error',dtl:error}
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