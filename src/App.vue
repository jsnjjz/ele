<template>
  <div id="app">
   	<iheader :seller1="seller"></iheader>    
   	
    <div class="tab  border1px">
    	<div class="tab-item">
    		 <router-link to="/goods">商品</router-link>
    	</div>
    	<div class="tab-item">
    		 <router-link to="/ratings">评论</router-link>
    	</div>
    	<div class="tab-item">
    		 <router-link to="/seller">商家</router-link>
    	</div>
    </div>
    <keep-alive>
	 		<router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
	import iheader from "./components/header/header.vue";
	
	export default {
		name: 'app',
		data(){                 //定义为函数  为了提高组件的复用
			return {
				seller: Object,
			};
		},
		//类似ajax获取数据  created 生命周期钩子  成功创建后执行方法
		created() {
      this.$http.get('/api/seller').then(response => {
        this.seller = response.body.data;
//        console.log(this.seller.name);

      });

    },
		components: {         //注册组件iheader
			iheader: iheader
		}
	}
</script>

<style scoped lang="scss">
	@import './common/common.scss';
	.tab {
		display: flex;
		height: 40px;
		background: #fff;
		line-height: 40px;
/*		border-bottom: 1px solid rgba(7,17,27,.1);*/
		@include border1px(rgba(7,17,27,.1));
		.tab-item {
			flex: 1;
			text-align: center;
			&>a {
				display: block;
				height: 100%;
				font-size: 14px;
				color: rgb(77,85,93);
				&.active {
					color: rgb(240,20,20);
				}
			}
		}
	}
</style>
