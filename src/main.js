import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import router from './router'
import Echarts from 'echarts'
import store from './store'
import axios from './utils/axios'
import 'element-ui/lib/theme-chalk/index.css';//element-ui的必备样式
import './styles/index.less'

Vue.use(ElementUI);
Vue.use(VueCookies);
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = Echarts;

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
