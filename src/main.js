import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import Axios from "axios";
import axiosCookieJarSupport from "axios-cookiejar-support";

Vue.config.productionTip = false

Vue.use(BootstrapVue)

axiosCookieJarSupport(Axios);

Vue.prototype.$axios = Axios.create({
  jar: true,
  withCredentials: true,
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
