(function(t){function e(e){for(var a,n,s=e[0],l=e[1],c=e[2],u=0,p=[];u<s.length;u++)n=s[u],Object.prototype.hasOwnProperty.call(o,n)&&o[n]&&p.push(o[n][0]),o[n]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(p.length)p.shift()();return i.push.apply(i,c||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var r=i[e],a=!0,n=1;n<r.length;n++){var s=r[n];0!==o[s]&&(a=!1)}a&&(i.splice(e--,1),t=l(l.s=r[0]))}return t}var a={},n={app:0},o={app:0},i=[];function s(t){return l.p+"js/"+({about:"about",post:"post",signup:"signup",welcome:"welcome"}[t]||t)+".js"}function l(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,l),r.l=!0,r.exports}l.e=function(t){var e=[],r={post:1,signup:1,welcome:1};n[t]?e.push(n[t]):0!==n[t]&&r[t]&&e.push(n[t]=new Promise((function(e,r){for(var a="css/"+({about:"about",post:"post",signup:"signup",welcome:"welcome"}[t]||t)+".css",o=l.p+a,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var c=i[s],u=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(u===a||u===o))return e()}var p=document.getElementsByTagName("style");for(s=0;s<p.length;s++){c=p[s],u=c.getAttribute("data-href");if(u===a||u===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,i=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete n[t],d.parentNode.removeChild(d),r(i)},d.href=o;var m=document.getElementsByTagName("head")[0];m.appendChild(d)})).then((function(){n[t]=0})));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var i=new Promise((function(e,r){a=o[t]=[e,r]}));e.push(a[2]=i);var c,u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=s(t);var p=new Error;c=function(e){u.onerror=u.onload=null,clearTimeout(d);var r=o[t];if(0!==r){if(r){var a=e&&("load"===e.type?"missing":e.type),n=e&&e.target&&e.target.src;p.message="Loading chunk "+t+" failed.\n("+a+": "+n+")",p.name="ChunkLoadError",p.type=a,p.request=n,r[1](p)}o[t]=void 0}};var d=setTimeout((function(){c({type:"timeout",target:u})}),12e4);u.onerror=u.onload=c,document.head.appendChild(u)}return Promise.all(e)},l.m=t,l.c=a,l.d=function(t,e,r){l.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},l.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},l.t=function(t,e){if(1&e&&(t=l(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(l.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)l.d(r,a,function(e){return t[e]}.bind(null,a));return r},l.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return l.d(e,"a",e),e},l.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},l.p="/post-ops/",l.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],u=c.push.bind(c);c.push=e,c=c.slice();for(var p=0;p<c.length;p++)e(c[p]);var d=u;i.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},1:function(t,e){},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r(t.layout,{tag:"component"})},o=[],i=(r("b0c0"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"layoutGuest"}},[r("v-app-bar",{attrs:{app:""}},[r("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),r("v-toolbar-title",[t._v("Publish")]),r("v-spacer"),r("v-btn",{attrs:{icon:"",value:"login",to:"/login"}},[r("v-icon",[t._v("mdi-login")])],1),r("v-btn",{attrs:{icon:"",disabled:""}},[r("v-icon",[t._v("mdi-text-search")])],1),r("v-btn",{attrs:{icon:"",disabled:""}},[r("v-icon",[t._v("mdi-dots-vertical ")])],1),r("v-chip",{staticClass:"float-right info ma-2",attrs:{"x-small":""}},[t._v("v "+t._s(t.appVersion))])],1),r("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title"},[t._v("Publish")]),r("v-list-item-subtitle",[t._v("work")])],1)],1),r("v-divider"),r("v-list",{attrs:{nav:"",dense:""}},[r("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[r("v-list-item",{attrs:{value:"home",to:"/"}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-home")])],1),r("v-list-item-title",[t._v("Home ")])],1)],1)],1)],1),r("router-view")],1)}),s=[],l={name:"app",components:{},data:function(){return{drawer:!1,group:null}},computed:{appVersion:function(){return"0.1.6"}}},c=l,u=(r("a9f4"),r("2877")),p=r("6544"),d=r.n(p),m=r("7496"),v=r("40dc"),f=r("5bc1"),g=r("8336"),h=r("cc20"),b=r("ce7e"),y=r("132d"),w=r("8860"),x=r("da13"),k=r("5d23"),_=r("1baa"),V=r("34c3"),C=r("f774"),S=r("2fa4"),L=r("2a7f"),j=Object(u["a"])(c,i,s,!1,null,null,null),O=j.exports;d()(j,{VApp:m["a"],VAppBar:v["a"],VAppBarNavIcon:f["a"],VBtn:g["a"],VChip:h["a"],VDivider:b["a"],VIcon:y["a"],VList:w["a"],VListItem:x["a"],VListItemContent:k["a"],VListItemGroup:_["a"],VListItemIcon:V["a"],VListItemSubtitle:k["b"],VListItemTitle:k["c"],VNavigationDrawer:C["a"],VSpacer:S["a"],VToolbarTitle:L["a"]});var T=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",{attrs:{id:"layoutMembers"}},[r("v-system-bar",{attrs:{app:""}},[r("v-spacer"),r("v-chip",{staticClass:"text-center indigo--text text--darken-4 font-weight-medium",attrs:{small:""}},[t._v(t._s(t.msg))])],1),r("v-app-bar",{attrs:{app:""}},[r("v-app-bar-nav-icon",{staticClass:"text-center indigo--text text--darken-4 font-weight-medium",on:{click:function(e){t.drawer=!t.drawer}}}),r("v-toolbar-title",{staticClass:"text-center indigo--text text--darken-4 font-weight-medium"},[t._v("Publish")]),r("v-spacer"),r("v-btn",{staticClass:"pa-7 text-center indigo--text text--darken-4 font-weight-medium",attrs:{icon:"",value:"login",to:"/welcome",outlined:""}},[r("v-avatar",{attrs:{size:"50"}},[r("v-img",{attrs:{src:t.photo,alt:"Avatar"}})],1)],1),r("v-btn",{attrs:{icon:"",value:"login"},on:{click:t.logout}},[r("v-icon",{staticClass:"indigo--text text--darken-4 font-weight-medium"},[t._v("mdi-logout")])],1)],1),r("v-navigation-drawer",{attrs:{fixed:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-list-item",[r("v-list-item-content",[r("v-list-item-title",{staticClass:"title text-center indigo--text text--darken-6 font-weight-medium"},[t._v("Publish")]),r("v-list-item-subtitle",[t._v("work")])],1)],1),r("v-divider"),r("v-list",{attrs:{nav:"",dense:""}},[r("v-list-item-group",{attrs:{"active-class":"deep-purple--text text--accent-4"},model:{value:t.group,callback:function(e){t.group=e},expression:"group"}},[r("v-list-item",{attrs:{value:"home",to:"/"}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-home")])],1),r("v-list-item-title",[t._v("Home")])],1),r("v-list-item",{attrs:{value:"post",to:"/post"}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-post")])],1),r("v-list-item-title",[t._v("Post ")])],1),r("v-list-item",{attrs:{value:"about",to:"/about"}},[r("v-list-item-icon",[r("v-icon",[t._v("mdi-account")])],1),r("v-list-item-title",[t._v("Account")])],1)],1)],1)],1),r("router-view")],1)},I=[],P={name:"layoutMembers",components:{},data:function(){return{drawer:!1,msg:null,userName:null,group:null,photo:"@/assets/avatars/man.png"}},mounted:function(){this.setUserInfo(),this.$nextTick((function(){}))},methods:{logout:function(){localStorage.removeItem("LoggedUser"),"Home"!==this.$route.name?this.$router.push({name:"Home",params:{msg:"Bye.. ".concat(this.userName)}}):this.$router.go(this.$router.currentRoute)},setUserInfo:function(){if(localStorage.getItem("LoggedUser")){var t=JSON.parse(localStorage.getItem("LoggedUser"));this.userName=t.user.name,this.msg=t.user.name+", Welcome!",t.user.profilePicture.length>0&&(this.photo=t.user.profilePicture)}else console.log("layoutMembers Ops Now User")}}},U=P,A=r("8212"),E=r("adda"),N=r("afd9"),D=Object(u["a"])(U,T,I,!1,null,null,null),$=D.exports;d()(D,{VApp:m["a"],VAppBar:v["a"],VAppBarNavIcon:f["a"],VAvatar:A["a"],VBtn:g["a"],VChip:h["a"],VDivider:b["a"],VIcon:y["a"],VImg:E["a"],VList:w["a"],VListItem:x["a"],VListItemContent:k["a"],VListItemGroup:_["a"],VListItemIcon:V["a"],VListItemSubtitle:k["b"],VListItemTitle:k["c"],VNavigationDrawer:C["a"],VSpacer:S["a"],VSystemBar:N["a"],VToolbarTitle:L["a"]});var B={name:"app",components:{LayoutGuest:O,LayoutMembers:$},data:function(){return{drawer:!1,layout:O}},mounted:function(){},watch:{$route:function(t){if(void 0!==t.meta.layout){var e=this.getToken();e&&"Home"==t.name?this.layout="LayoutMembers":this.layout=t.meta.layout}else this.layout="LayoutGuest"}}},M=B,F=(r("7faf"),Object(u["a"])(M,n,o,!1,null,null,null)),H=F.exports,G=(r("fb6a"),r("ac1f"),r("1276"),r("1232")),J=a["a"].mixin({methods:{capitalizeFirstLetter:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},sampleFunction:function(){alert("Global Functions")},setUserInfo:function(){if(localStorage.getItem("LoggedUser")){var t=JSON.parse(localStorage.getItem("LoggedUser"));return t.user.name+", Welcome!"}return console.log("layoutMembers Ops Now User"),null},getToken:function(){if(localStorage.getItem("LoggedUser")){var t=JSON.parse(localStorage.getItem("LoggedUser"));return t.jwt}return console.log("layoutMembers Ops Now User"),null},myIDis:function(){var t=this.getToken();if(t){var e=t&&t.split(" ").length>1?Object(G["a"])(t.split(" ")[1]):Object(G["a"])(t);return e.id}}}}),R=(r("d3b7"),r("3ca3"),r("ddb0"),r("8c4f")),W=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-main",{staticClass:"grey lighten-2"},[r("v-container",[r("v-row",{staticClass:"pa-5",attrs:{justify:"space-around"}},[t.msg?r("v-banner",{staticClass:"pa-2 green accent-2 rounded-xl font-weight-bold",attrs:{width:"100%","single-line":"",elevation:"9",icon:"mdi-human-greeting"}},[t._v(t._s(t.msg))]):t._e(),r("v-sheet",{staticClass:"mt-10 rounded-xl",attrs:{width:"100%",height:t.height,elevation:"5"}},[r("div",{staticClass:"text-h3 mt-5 text-center indigo--text text--darken-6 font-weight-medium"},[t._v("Best publisher service !")])]),r("v-row",{staticClass:"mt-2",attrs:{justify:"space-around"}},[r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-sheet",{staticClass:"ml-2 rounded-sm",attrs:{width:"100%",height:"250",elevation:"2"}},[r("v-layout",{staticClass:"pt-10",attrs:{"align-center":"","justify-space-around":""}},[r("div",[r("v-chip",{staticClass:"primary lighten-3",attrs:{close:"","close-icon":"mdi-account",color:"blue",link:"",outlined:""}},[t._v("Users ")]),r("v-chip",{staticClass:"red",attrs:{link:"",outlined:""}},[t._v(t._s(t.users))])],1)]),r("div",{staticClass:"text-h5 pa-5 ml-5 text-center  brown--text text--darken-5"},[t._v("Start right now register and publish your thought for the world. ")])],1)],1),r("v-col",{attrs:{cols:"12",sm:"6"}},[r("v-sheet",{staticClass:"rounded-sm mr-5",attrs:{width:"100%",height:"250",elevation:"2"}},[r("v-layout",{staticClass:"pt-10",attrs:{"align-center":"","justify-space-around":""}},[r("div",[r("v-chip",{staticClass:"primary lighten-3",attrs:{close:"","close-icon":"mdi-printer",color:"blue",link:"",outlined:""}},[t._v("Posts ")]),r("v-chip",{staticClass:"red",attrs:{link:"",outlined:""}},[t._v(t._s(t.post)+" ")])],1)]),r("v-layout",{attrs:{"align-center":"","justify-space-around":""}},[r("div",{staticClass:"text-h5 pa-5 ml-5 text-left  brown--text text--darken-5"},[t._v("Let others become know how things getting really on. ")])])],1)],1),r("v-row",{staticClass:"mt-5 pa-5",attrs:{justify:"space-around"}})],1)],1)],1),r("v-dialog",{attrs:{"hide-overlay":"",persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[r("v-card",{attrs:{color:"primary lighten-3"}},[r("v-card-text",[t._v("Please stand by"),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],1)},q=[],z=r("1da1"),K=(r("96cf"),{props:{msg:{type:String,default:function(){return null}}},data:function(){return{name:"Home",users:0,post:0,loading:!1}},mounted:function(){this.getAllUser(),this.allPost(),console.log("process.env.VUE_APP_VERSION ","0.1.6");var t=window.location.href.split("?");if(2==t.length){var e=t[1].split("&"),r=e[0].split("="),a=e[1].split("=");"token"==r[0]&&2==r.length&&"refresh_token"==a[0]&&2==a.length&&(console.log(a[1]," Token in url is  url= ",r[1]),this.saveTokens("Bearer "+r[1],a[1]),this.$router.push({name:"Welcome",params:{token:"Bearer "+r[1]}}))}},computed:{height:function(){switch(this.$vuetify.breakpoint.name){case"xs":return 130;case"sm":return 130;case"md":return 90;case"lg":return 90;case"xl":return 90;default:return 90}}},methods:{saveTokens:function(t,e){var r=t.split(" ").length>1?Object(G["a"])(t.split(" ")[1]):Object(G["a"])(t);localStorage.setItem("LoggedUser",JSON.stringify({jwt:t,uJwt:e,user:r}))},getAllUser:function(){var t=this;return Object(z["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,fetch("https://post-ops.herokuapp.com/api/users/total",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json;charset=utf-8"}}).then((function(t){return t.json()})).then((function(e){t.users=e.result,t.loading=!1})).catch((function(e){console.error("Post Error:",e),t.loading=!1}));case 3:case"end":return e.stop()}}),e)})))()},allPost:function(){var t=this;return Object(z["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://post-ops.herokuapp.com/api/posts/total",{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json;charset=utf-8"}}).then((function(t){return t.json()})).then((function(e){t.post=e.result})).catch((function(t){console.error("Post Error:",t)}));case 2:case"end":return e.stop()}}),e)})))()}}}),Q=K,X=r("e4e5"),Y=r("b0af"),Z=r("99d9"),tt=r("62ad"),et=r("a523"),rt=r("169a"),at=r("a722"),nt=r("f6c4"),ot=r("8e36"),it=r("0fd9"),st=r("8dd9"),lt=Object(u["a"])(Q,W,q,!1,null,null,null),ct=lt.exports;d()(lt,{VBanner:X["a"],VCard:Y["a"],VCardText:Z["b"],VChip:h["a"],VCol:tt["a"],VContainer:et["a"],VDialog:rt["a"],VLayout:at["a"],VMain:nt["a"],VProgressLinear:ot["a"],VRow:it["a"],VSheet:st["a"]});var ut=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-main",{staticClass:"grey lighten-3"},[r("v-container",{staticStyle:{height:"100%"}},[r("v-row",{staticStyle:{height:"70vh"},attrs:{align:"center",justify:"center","no-gutters":"",dense:""}},[r("v-card",{staticClass:"mx-auto",attrs:{"max-width":"544",elevation:"12",shaped:"",width:"400"}},[r("v-toolbar",{attrs:{color:"secondary",dark:"",flat:""}},[r("v-toolbar-title",[t._v("Login form ")])],1),r("v-card-text",[r("v-form",{attrs:{align:"center",justify:"center"}},[r("v-text-field",{attrs:{label:"Login",name:"login","prepend-icon":"mdi-account",type:"text"},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),r("v-text-field",{attrs:{label:"Password",name:"password","prepend-icon":"mdi-lock",type:"password"},model:{value:t.pwd,callback:function(e){t.pwd=e},expression:"pwd"}})],1)],1),r("v-card-actions",{staticClass:"mt-n5"},[r("v-btn",{staticClass:"flex",attrs:{color:"orange lighten-2",elevation:"12"},on:{click:t.login}},[t._v("Login")])],1),r("v-row",{staticClass:"mt-3"},[r("v-col",[r("v-divider")],1),r("v-subheader",{staticClass:"mt-n3"},[t._v("or ")]),r("v-col",[r("v-divider")],1)],1),r("v-card-actions",[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-btn-toggle",{attrs:{tile:"",color:"deep-purple accent-3",group:""},model:{value:t.text,callback:function(e){t.text=e},expression:"text"}},[r("v-btn",{attrs:{icon:"",href:"http://post-ops.herokuapp.com/api/auth/google"},on:{click:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"end",void 0,e.key,void 0))return null;t.loading=!0}}},[r("v-icon",[t._v("mdi-google")])],1),r("v-btn",{attrs:{icon:"",href:"http://post-ops.herokuapp.com/api/auth/mailru"},on:{click:function(e){if(!e.type.indexOf("key")&&t._k(e.keyCode,"end",void 0,e.key,void 0))return null;t.loading=!0}}},[r("v-icon",[t._v("mdi-at")])],1),r("v-btn",{attrs:{icon:"",href:"http://post-ops.herokuapp.com/api/auth/github"},on:{click:function(e){t.loading=!0}}},[r("v-icon",[t._v("mdi-github ")])],1),r("v-btn",{attrs:{icon:"",href:"http://post-ops.herokuapp.com/api/auth/facebook",disabled:""}},[r("v-icon",[t._v("mdi-facebook ")])],1)],1)],1)],1),r("v-divider"),r("v-card-actions",[r("v-subheader",[t._v(" DON'T HAVE AN ACCOUNT? ")]),r("v-btn",{attrs:{color:"indigo lighten-2",to:"signup",elevation:"3"}},[t._v("SIGN UP ")])],1)],1)],1),r("v-row",{staticStyle:{height:"50vh"},attrs:{align:"center",justify:"center","no-gutters":"",dense:""}},[r("v-dialog",{staticClass:"pa-2",attrs:{"max-width":"490"},model:{value:t.errorDlg,callback:function(e){t.errorDlg=e},expression:"errorDlg"}},[t.errorDlg?r("v-card",{attrs:{"max-height":"900"}},[r("v-toolbar",{staticClass:"primary darken-1 white--text font-weight-medium",attrs:{dense:""}},[t._v("Error")]),r("v-card-title",{staticClass:"headline"},[t._v(" "+t._s(t.error.msg))]),r("v-card-text",[t._v(t._s(t.error.dtl))]),r("v-card-actions",[r("v-btn",{staticClass:"secondary lighten-3",on:{click:function(e){e.stopPropagation(),t.errorDlg=!1}}},[t._v("Close ")])],1)],1):t._e()],1)],1),r("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},[r("v-card",{attrs:{color:"primary lighten-3"}},[r("v-card-text",[t._v("Please stand by"),r("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],1)],1)},pt=[],dt=(r("159b"),{data:function(){return{error:{msg:"",dtl:"."},errorDlg:!1,loading:!1,show:!1,text:"Ole",name:"todhruva@mail.ru",pwd:"qwerexQ1"}},mounted:function(){this.$nextTick((function(){var t=this.$route.query.token,e=this.$route.query.refresh_token;t&&e&&(this.saveTokens("Bearer "+t,e),this.$router.push({name:"Welcome",params:{token:"Bearer "+t}}))}))},methods:{login:function(){var t=this;return Object(z["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,fetch("https://post-ops.herokuapp.com/api/auth/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json;charset=utf-8"},body:JSON.stringify({email:"".concat(t.name),password:"".concat(t.pwd)})}).then((function(t){return t.json()})).then((function(e){var r=Object(G["a"])(e.token.split(" ")[1]);localStorage.setItem("LoggedUser",JSON.stringify({jwt:e.token,uJwt:e.refresh_token,user:r})),t.$route.meta.visible=!0,t.$router.options.routes.forEach((function(t){t.meta&&t.meta.visible&&(t.meta.visible=!0)})),t.$router.push({name:"Welcome",params:{token:e.token}})})).catch((function(e){return t.loading=!1,t.error={msg:"Bad user ID or password",dtl:"please try again"},t.errorDlg=!0,e}));case 3:case"end":return e.stop()}}),e)})))()},saveTokens:function(t,e){var r=t.split(" ").length>1?Object(G["a"])(t.split(" ")[1]):Object(G["a"])(t);localStorage.setItem("LoggedUser",JSON.stringify({jwt:t,uJwt:e,user:r}))}}}),mt=dt,vt=r("a609"),ft=r("4bd4"),gt=r("e0c7"),ht=r("8654"),bt=r("71d9"),yt=Object(u["a"])(mt,ut,pt,!1,null,null,null),wt=yt.exports;d()(yt,{VBtn:g["a"],VBtnToggle:vt["a"],VCard:Y["a"],VCardActions:Z["a"],VCardText:Z["b"],VCardTitle:Z["c"],VCol:tt["a"],VContainer:et["a"],VDialog:rt["a"],VDivider:b["a"],VForm:ft["a"],VIcon:y["a"],VMain:nt["a"],VProgressLinear:ot["a"],VRow:it["a"],VSubheader:gt["a"],VTextField:ht["a"],VToolbar:bt["a"],VToolbarTitle:L["a"]}),a["a"].use(R["a"]);var xt=[{path:"/",name:"Home",component:ct,props:!0,meta:{visible:!1,title:"Home",layout:"LayoutGuest"}},{path:"/about",name:"About",beforeEnter:kt,component:function(){return r.e("about").then(r.bind(null,"f820"))},meta:{visible:!1,title:"About",layout:"LayoutMembers"}},{path:"/login",name:"Login",component:wt,meta:{visible:!1,title:"Login",layout:"LayoutGuest"}},{path:"/signup",name:"SignUP",component:function(){return r.e("signup").then(r.bind(null,"419e"))},meta:{visible:!1,title:"SignUP",layout:"LayoutGuest"}},{path:"/welcome",name:"Welcome",beforeEnter:kt,component:function(){return r.e("welcome").then(r.bind(null,"eec5"))},props:!0,meta:{visible:!1,title:"Welcome",layout:"LayoutMembers"}},{path:"/post",name:"Post",beforeEnter:kt,component:function(){return r.e("post").then(r.bind(null,"37d3"))},props:!0,meta:{visible:!1,title:"Post",layout:"LayoutMembers"}}];function kt(t,e,r){localStorage.getItem("LoggedUser")?r():r("/login")}var _t=new R["a"]({mode:"history",base:"/post-ops/",routes:xt});_t.afterEach((function(t){t.meta&&t.meta.title&&(document.title=t.meta.title)}));var Vt=_t,Ct=r("f309");a["a"].use(Ct["a"]);var St=new Ct["a"]({theme:{options:{customProperties:!0},themes:{light:{primary:"#ee44aa",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),Lt=(r("d5e8"),r("5363"),r("4de4"),r("25f0"),r("498a"),r("5319"),r("b9b9")),jt=r.n(Lt),Ot=r("c70b");a["a"].filter("toCurrency",(function(t){if("number"!==typeof t)return t;var e=new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:0});return e.format(t)})),a["a"].filter("toExponentialFree",(function(t){var e=t;function r(t){return Ot.format(t,{notation:"fixed"})}return"number"!==typeof t&&(e=Ot.number(e)),r(e)})),a["a"].filter("toFixDecimal",(function(t){var e=t;function r(t){return Ot.format(t,{precision:6})}return"number"!==typeof t&&(e=Ot.number(e)),r(e)})),a["a"].filter("capitalize",(function(t){return t?(t=t.toString(),t.charAt(0).toUpperCase()+t.slice(1)):""})),a["a"].filter("minimize",(function(t){return t?(t=t.toString()," ..."):""})),a["a"].filter("toMysqlFormat",(function(t){if(!t)return"";var e=t.toString().replace(/\.|T|.[^.]*$/g," ").trim();return e})),a["a"].filter("toLocalTime",(function(t){if(!t)return"";var e=jt()(new Date(t),"yyyy-mm-dd HH:MM:ss");return e})),a["a"].filter("toShortTime",(function(t){if(!t)return"";var e=jt()(new Date(t),"yyyy-mm-dd HH:MM");return e})),a["a"].filter("toUtcTime",(function(t){if(!t)return"";var e=new Date(t).toISOString().replace(/\.|T|.[^.]*$/g," ").trim();return e}));var Tt=r("ed18"),It=r.n(Tt);It.a.config(),a["a"].config.productionTip=!1,a["a"].component("my-icon",{template:'<svg height="24" width="24">\n        <circle cx="12" cy="12" r="9" fill="red" />\n    </svg>'}),new a["a"]({router:Vt,vuetify:St,mixin:J,render:function(t){return t(H)}}).$mount("#app")},"7faf":function(t,e,r){"use strict";r("b8ff")},"962e":function(t,e,r){},a9f4:function(t,e,r){"use strict";r("962e")},b8ff:function(t,e,r){}});
//# sourceMappingURL=app.js.map