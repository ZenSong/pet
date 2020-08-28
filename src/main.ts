import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './components/common/js/reset.ts'
// 引入通用样式
import 'vant/lib/index.css';
import './components/common/css/reset.css'
import {mutations} from './store/index'

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
// axios.defaults.baseURL = 'http://192.168.0.109:8082/food'//本地  
// axios.defaults.baseURL = "http://www.lunchcooking.com:13331/food" // 线上
axios.defaults.baseURL = 'http://192.168.0.37:14111/food'//37
import { Icon ,Swipe, SwipeItem,Loading,ImagePreview} from 'vant'; 
Vue.use(Icon).use(Swipe).use(SwipeItem).use(Loading).use(ImagePreview);
router.beforeEach((to,from,next) => {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;   
  if(to.path == '/search') {
    mutations.SET_ENTER_SEARCH(true);
    mutations.SET_SEL_MODULE(10);
  }
  else {
    mutations.SET_ENTER_SEARCH(false);
  } 
  if(to.path == '/') {
    mutations.SET_SEL_MODULE(0);
  }
  else if(to.path == '/news'){
    mutations.SET_SEL_MODULE(1);
  }
  else if(to.path == '/training'){
    mutations.SET_SEL_MODULE(2);
  }
  else if(to.path == '/some'){
    mutations.SET_SEL_MODULE(11);
  }
  next();
})

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
