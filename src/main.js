import Vue from 'vue'
import Paginate from 'vuejs-paginate'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import dateFilter from '@/filters/date.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import loader from '@/components/app/loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.filter('dateF', dateFilter)
Vue.filter('localize', localizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.use(messagePlugin)
Vue.component('loader', loader)
Vue.component('paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyDbAo80XQcoJzpEtGvveSDkdWineFEeWnk',
  authDomain: 'vue2-practice.firebaseapp.com',
  databaseURL: 'https://vue2-practice-default-rtdb.firebaseio.com',
  projectId: 'vue2-practice',
  storageBucket: 'vue2-practice.appspot.com',
  messagingSenderId: '572722128083',
  appId: '1:572722128083:web:a29be4c0b4fa8bce42e026',
  measurementId: 'G-8PQ7V6SVCS'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
