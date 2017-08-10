<template>
<!--
	<div class="cartcontrol">
		<div class="cart_left" v-show="food.count" @click="less($event)">
			<i class="iconfont icon-remove_circle_outline"></i>
		</div>
		<div class="count" v-show="food.count">
			<span>{{food.count}}</span>
		</div>
		<div class="cart_right" @click.stop.prevent="add($event)">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
-->
	
	
	
	<div class="carcontrol">
    <transition name="move">
      <div class="decrease" v-show="food.count" @click.stop.prevent="decrease($event)">
        <i class="iconfont icon-remove_circle_outline"></i>
      </div>
    </transition>
    
    <transition name="fade">
      <div class="count" v-show="food.count">{{food.count}}</div>
    </transition>
    
    <div class="add" @click.stop.prevent="add($event)">
      <i class="iconfont icon-add_circle"></i>
    </div>
  </div>
	
	
	
</template>

<!--
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
-->

<script>
  import Vue from "vue";
  export default{
    props:{
      food:{
        return:Object
      }
    },
    methods:{
      add(event){
        if(!event._constructed){
          return
        }
        if(!this.food.count){
          Vue.set(this.food,'count',1);  //给food对象添加count属性
        }else{
          this.food.count++
        }
      },
      decrease(event){
        if(!event._constructed){
          return
        }
        this.food.count--
        
      }
    }
  }
</script>


<!-- <style scoped lang="scss">
	.cartcontrol {
		position: relative;
		width: 74px;
/*		background: yellowgreen;*/
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
</style> -->


<style lang="scss" scoped>
  @import "../../common/mixin.scss";
  .carcontrol{
    .decrease,.count,.add{
      display: inline-block;
      vertical-align: top;
      font-size: 20px;
      color: #00a0dc;
    }
    .count{
      margin: 0 12px;
    }
    
    .move-enter-active {
      transition: all .3s ease;
    }
    .move-leave-active {
      transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .move-enter,.move-leave-to{
       transform: translateX(10px);
      opacity: 0;
    }
    
    .fade-enter-active {
      transition: all .3s ease;
    }
    .fade-leave-active {
      transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .fade-enter,.fade-leave-to{
       transform: translateX(10px);
      opacity: 0;
    }

  }
</style>

