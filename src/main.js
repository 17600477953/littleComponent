// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '@/styles/main.scss'
import Calendar from 'vue-mobile-calendar'

Vue.use(Calendar)

Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.BASE_API
} else {
  // axios.defaults.baseURL = 'http://10.10.23.35:3000'
  axios.defaults.baseURL = 'https://easy-mock.com/mock/5a66e36c22fd760ce19451f8/add'
}
Vue.prototype.$http = axios
function fontSize (win, doc) {
  change()
  function change () {
    doc.documentElement.style.fontSize = doc.documentElement.clientWidth * 10 / 375 + 'px'
  }
  win.addEventListener('resize', change, false)
  win.addEventListener('orientationchange', change, false)
}
fontSize(window, document)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
