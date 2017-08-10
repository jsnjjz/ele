<template>
	
	<div class="shopcar">
	
		<div class="wrap_box">

			<div class="content">
				<div class="content-left " :class="{'enough': totalCount>0}" @click="toggleList($event)">
					<div class="logo-wrapper">
						<div class="logo-wrapper1">
							<i class="iconfont icon-shopping_cart"></i>
						</div>
						<div class="count">
							{{totalCount}}
						</div>
					</div>
					<span class="money">¥ {{totalPrice}}</span>
					<span class="add">另需配送费¥ {{delivery}}元</span>
				</div>

				<div class="content-right" :class="{'enough': this.totalPrice >= minPrice}" >
					{{pay}}
				</div>
			</div>

			<transition name="fold">
				<div class="shopcart-list" v-show="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1>
						<span class="empty" @click="empty">清空</span>
					</div>

					<div class="list-content" ref="listContent">
						<ul>
							<li class="food" v-for="food in selectFoods">
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>{{food.price * food.count}}</span>
								</div>


								<div class="carcontrol-wrap">
									<carcontrol :food="food"></carcontrol>
								</div>

							</li>
						</ul>
					</div>
				</div>
			</transition>

			
			
		</div>
		
<!--		 v-show="listShow"-->
		
		
		<transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>  
    </transition>
		
	</div>
</template>

<script>
import BScroll from "better-scroll"	
	
import carcontrol from '../carcontrol/carcontrol.vue'
	
export default {
	components: {
		carcontrol: carcontrol
	},
	methods: {
		toggleList (event){
			if(!this.totalCount){
				return
			}
			this.fold = !this.fold;
			this.$nextTick(() => {
				if(!this.scroll){
					this.scroll = new BScroll(this.$refs.listContent,{
						click: true
					})
				}else {
					this.scroll.refresh();
				}
			})
		},
		
		empty (){
			this.selectFoods.forEach((food) => {
				food.count = 0;
			})
		},
		hideList (){
			this.fold = true
		}
	},
	data() {
		return{
			fold: true
		}
	},
	props: {
		delivery: {
			type: Number,
			default: 0
		},
		minPrice: {
			type: Number,
			default: 0,
//			return: Number
		},
		selectFoods: {     //用来模拟以后商品组件传来的数据
			type: Array,
			default (){
				return [
					{
					price: 15,
					count: 2
					}
				]
			}
		}
	},
	computed: {
		totalPrice (){
			let price = 0;
			//将每个商品的单价 数量进行计算
			this.selectFoods.forEach((goods) => {
				price += goods.price * goods.count
			})
			return price
		},
		totalCount (){
			let count = 0;
			this.selectFoods.forEach((goods) => {
				count += goods.count
			})
			return count
		},
		pay (){
			if(this.totalCount === 0){
				return `最低配送费¥${this.minPrice}元`
			}else if(this.totalPrice < this.minPrice){
				let diff = this.minPrice - this.totalPrice;
				return `还差¥${diff}元`
			}else {
				return `去结算`
			}
		},
		
		
		listShow (){
			if(!this.totalCount){
				this.fold = true;
				return false
			}
			let show = !this.fold;
			return show
			
			
		}
		
		
		

		
//		listShow(){
//			if(!this.totalCount){
//				this.fold = true;
//				return false;
//			}
//			let show = !this.fold;
//			if(show){
//				this.$nextTick(() => {
//					this.scroll = new BScroll(this.$refs.listContent,{
//						click: true
//					})
//				})
//			}
//			
//			
////			return true
//		},
		
	}
	
}
</script>


<style scoped lang="scss">
	.shopcar {
		position: fixed;
	
		bottom: 0;
		left: 0;
		
		width: 100%;
		height: 48px;
		font-size: 20px;
		
		.wrap_box {
			position: relative;
			z-index: 100;
		}
		.content {
			display: flex;
			.content-left {
				flex: 1;
				position: relative;
				background: #141d27;
				.logo-wrapper {
					position: absolute;
					left: 14px;
					top: -10px;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					background: #141d27;
					.logo-wrapper1 {
						position: absolute;
						top: 16px;
						left: 16px;
						margin-left: -8px;
						margin-top: -8px;
						width: 44px;
						height: 44px;
						border-radius: 50%;
						background: #2b343c;
						text-align: center;
						line-height: 50px;
					}
					.icon-shopping_cart {
						color: #80858a;
						font-size: 24px;
					}
					.count {
						display: none;
						position: absolute;
						top: 0;
						right: 0;
/*						padding: 5px;*/
						width: 25px;
						height: 15px;
						text-align: center;
						line-height: 15px;
						border-radius: 15px;
						background: #f01414;
						font-size: 12px;
						color: #fff;
					}
				}
				.money {
					margin-right: 10px;
					margin-left: 86px;
					padding-right: 10px;
					font-size: 16px;
					color: #85878a;
					font-weight: 700;
					line-height: 48px;
					border-right: 1px solid rgba(255,255,255,.1);
				}
				.add {
					font-size: 12px;
					color: rgba(255,255,255,.4);
					font-weight: 200;
				}
				
				&.enough {
					background: #08121c;
					.logo-wrapper {
						background: #08121c;
						.logo-wrapper1{
							background: #00a0dc;
							.icon-shopping_cart {
								color: #fff;
							}
						}
					}
					.count {
						display: block;
					}
				}
				
/*
				&.not_reached {
					background: #08121c;
					.logo-wrapper {
						background: #08121c;
						.logo-wrapper1{
							background: #00a0dc;
							.icon-shopping_cart {
								color: #fff;
							}
						}
					}
					.money {
						color: #fff;
					}
				}
*/
				
			}
			.content-right {
				flex: 0 0 105px;
				width: 105px;
				text-align: center;
				font-size: 12px;
				color: rgba(255,255,255,.4);
				line-height: 48px;
				font-weight: 700;
				background: #2b333b;
				&.enough {
					background: #00b43c;
					color: #fff;
				}
			}
		}
		
		.shopcart-list{
      position: absolute;
			
      bottom: 48px;
      left: 0;
      z-index: -1;
      width:100%;
    }
    
/*
    .fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
*/
    .list-header{
      padding: 0 18px;
      height: 40px;
      line-height:40px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7,17,27,.1);
      .title{
        float:left;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .empty{
        float: right;
        font-size: 12px;
        color:rgb(0, 160, 220);
      }
    }
    .list-content{
      padding: 0 18px;
      max-height:217px;
      overflow: hidden;
      background:#fff;
      .food{
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        // @include border-1px(rgba(7, 17, 27,.1));
        .name{
          line-height:24px;
          font-size:14px;
          color:rgb(7,17,27);
        }
        .price{
          position: absolute;
          right:90px;
          bottom:12px;
          line-height: 24px;
          font-size:14px;
          font-weight:700;
          color:rgb(240,20,20);
        }
        .carcontrol-wrap{
          position: absolute;
          right:0;
          bottom: 14px;
        }
      }
    }
		
		.list-mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 10;
			background:rgba(7,17,27,.6);
			background-filter: blur(10px);
		}
		.fade-enter-active, .fade-leave-active {
			transition: all .5s;
		}
		.fade-enter, .fade-leave-active {
			opacity:0;
		}
		
		.fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
	}
</style>