import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Element from 'element-ui';
import App from './App.vue';

import routes from './routes';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(Element);

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
