import Vue from 'vue'
import App from './App.vue'
import router from '../router/index'
import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import AnimeJs from 'animejs'
// import Jquery from 'jquery'
// import JqueryUI from 'jquery-ui'

Vue.config.productionTip = false
Vue.use(router)
Vue.use(BootstrapVue)
Vue.use(AnimeJs)
// Vue.use(Jquery)

// Vue.use(JqueryUI)

new Vue({
  el: '#app',
  router,
  components: { 
    App,
     
  },
  template: '<App/>',
})
