// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'    
import App from './App'   

import VueRouter from 'vue-router'
Vue.use(VueRouter)     
//注册／安装 VueRouter script src="../vue-router.js"

import VueResource from 'vue-resource';
Vue.use(VueResource);
//注册／安装 VueResource script src="../resource.js"

import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

//组件
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

Vue.config.productionTip = false    //设置为 false 以阻止 vue 在启动时生成生产提示。

//定义组件的路由 (类似映射表)
const routes = [
	{ path: '/', redirect: '/goods'},      //redirect 重定向  表示默认渲染的元素
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller}
]

//注册组件  实例化 这个类
const router = new VueRouter({
	mode: 'history',
  routes,// （缩写）相当于 routes: routes
	linkActiveClass: 'active'   //设置class名为 active
})

/* eslint-disable no-new */
//根组件
new Vue({
  el: '#app',
  router,                
  template: '<App/>',    
  components: { App }     //对应上面的  App组件 引入到 根组件里
}).	$mount('#app');
//挂载组件