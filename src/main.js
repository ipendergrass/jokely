// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import VueQuillEditor from 'vue-quill-editor'
import firebase from 'firebase'
import store from './store'
import moment from 'moment'
import '@fortawesome/fontawesome-free/css/all.css'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyA4AB3u7xryAqCKbDV-7SxiBKrlfXer5Kg',
  authDomain: 'sweltering-fire-8409.firebaseapp.com',
  databaseURL: 'https://sweltering-fire-8409.firebaseio.com',
  projectId: 'sweltering-fire-8409',
  storageBucket: 'sweltering-fire-8409.appspot.com',
  messagingSenderId: '193873750643'
}
firebase.initializeApp(config)

Vue.config.productionTip = false

Vue.firebase = Vue.prototype.$firebase = firebase
Vue.db = Vue.prototype.$db = firebase.firestore()

Vue.use(Vuetify, {
  iconfont: 'mdi' || 'fa' // 'md' || 'mdi' || 'fa' || 'fa4'
})
Vue.use(VueQuillEditor /*, { default global options } */)
Vue.use(Vuetify)
Vue.use(require('vue-moment'), {
  moment
})

router.beforeEach((to, from, next) => {
  if (store.state.user.info === null && to.name !== 'Login') {
    next('/')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
