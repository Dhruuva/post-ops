import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import mixin from './plugins/global' // Here globals methods
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import './filters'
import dotenv from 'dotenv'

dotenv.config()

console.log("VUE_APP_BACKEND_URL="  , process.env.VUE_APP_BACKEND_URL) 
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  mixin,
  render: h => h(App)
}).$mount('#app')
