
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//导入axios
import axios from 'axios';
import VueAxios from 'vue-axios';

//引入ElementUI
// import ElementPlus from 'element-plus';
// import 'element-plus/dist/index.css';

//引入swiper组件样式
import 'swiper/swiper-bundle.min.css'
//基础样式
import 'swiper/swiper.min.css'

//修改axios的原型属性
axios.defaults.baseURL = '/api';

//引入iconfont样式
import './assets/css/iconfont.css';
createApp(App).use(store).use(router).use(VueAxios,axios).use(ElementPlus).mount("#app");
