<template>
	<div class="shopcar">
		<div class="content">
			<div class="content-left " :class="{'enough': totalCount>0}">
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
	</div>
</template>

<script>
export default {
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
		}
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
	}
</style>