// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'    //???指向
import App from './App'   //???指向

import VueRouter from 'vue-router'
Vue.use(VueRouter)     
//注册／安装 VueRouter script src="../vue-router.js"

import VueResource from 'vue-resource';
Vue.use(VueResource);
//注册／安装 VueResource script src="../resource.js"


//组件
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

Vue.config.productionTip = false

//定义组件的路由 (类似映射表)
const routes = [
//	{ path: '/', redirect: '/goods'},      //redirect 重定向  表示默认渲染的元素
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller}
]

//注册组件  实例
const router = new VueRouter({
  routes,// （缩写）相当于 routes: routes
	linkActiveClass: 'active'   //设置class名为 active
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,                //？？？？？
  template: '<App/>',    //??????
  components: { App }     //  已经定义了 el 挂载组件 是什么意思
}).	$mount('#app');
//挂载组件