<template>
  <div class="header clearfix">
		<div class="head_box">        
			<img width="64" height="64" :src="seller1.avatar" alt="">
			                           <!--:src 因为 seller1是一个 对象 需要对其做个判断-为空时  就渲染-->
			                           
			<div class="pull-right">
				<h2><span class="brand"></span>{{seller1.name}}</h2>
				<p class="desc">{{seller1.description}}/{{seller1.deliveryTime}}分钟送达</p>
			</div>
			
			<div class="supports_wrapper">
					<!--加v-if 因为这个数据是异步加载进来的  开始时  他是个 空对象-->
				<supports11 v-if="seller1.supports" :supports="seller1.supports"></supports11>
			</div>
		</div>
  </div>
</template>

<script>

import supports from '../supports/supports.vue'
export default {
	props: {
		seller1: {
			return: Object       // 此处是从前面Vue传来的数据  这里为什么要 return 
		}
	},
	components: {
		supports11: supports
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../common/mixin.scss';
	.header {
			.head_box {
				padding-left: 24px;
				padding-top: 24px;
				padding-right: 12px;
				padding-bottom: 18px;
				img {
					float: left;
				}
				.brand {
					display: inline-block;
					width: 30px;
					height: 18px;
					@include bgImage("brand");
					background-size: cover;
				}
				.supports_wrapper {
/*					font-size: 40px;*/
				}
		
	}
}
</style>