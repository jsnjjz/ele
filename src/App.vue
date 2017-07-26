<template>
  <div id="app">
   	<iheader></iheader>
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
     <router-view></router-view>
  </div>
</template>

<script>
	import iheader from "./components/header/header.vue";
	export default {
		name: 'app',
		data(){
			return {
				seller: Object
			};
		},
		//类似ajax获取数据
		created() {
      this.$http.get('/api/seller').then(response => {
        this.seller = response.body;
        console.log(this.seller.seller.name);
      });
//			this.$http.get('/api/seller').then(respone => {
//				this.seller = response.body;
////				console.log(this.seller.seller.name)
//			})
    },
		components: {
			iheader: iheader
		}
	}
</script>

<style scoped lang="scss">
	@import './common/common.scss';
	
	.tab {
		display: flex;
		height: 40px;
/*		background: yellowgreen;*/
		line-height: 40px;
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
