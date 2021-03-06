import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入elementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

Vue.config.productionTip = false
import 'normalize.css/normalize.css'

//使用elementUI
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
