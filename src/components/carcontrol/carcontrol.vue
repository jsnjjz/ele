<template>
	<div class="cartcontrol">
<!--
		<transition name="move">
			<div class="decrease" v-show="food.count > 0" @click="decrease">
				<i class="iconfont icon-remove_circle_outline"></i>
			</div>
		</transition>
-->
		<div class="cart_left" v-show="food.count" @click="less($event)">
			<i class="iconfont icon-remove_circle_outline"></i>
		</div>
		<div class="count" v-show="food.count">
			<span>{{food.count}}</span>
		</div>
		<div class="cart_right" @click="add($event)">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
	
</template>

<script>
	import Vue from "vue"
	export default {
		props: {
			food: {
				return: Object
			}
		},
		computed: {
			
		},
		methods: {
			add (event){
				if(!event._constructed){
					return
				}
				
				if(!this.food.count){
					Vue.set(this.food,'count',1)  //给food对象添加属性
				}else {
					this.food.count++
				}
			},
			less (event){
				if(!event._constructed){
					return
				}
				if(this.food.count){
					this.food.count--
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.cartcontrol {
		position: relative;
		width: 74px;
		background: yellowgreen;
		>div {
			display: inline-block;
			vertical-align: middle;
			i {
				font-size: 24px;
				color: #00a0dc;
			}
		}
		.cart_left {
			position: absolute;
			left: 0;
			top: 0;
		}
		.cart_right {
			position: absolute;
			right: 0;
			top: 0;
		}
		.count {
			width: 100%;
			text-align: center;
		}
		
	}
</style>
