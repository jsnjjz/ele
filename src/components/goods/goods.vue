<template>
  <div class="goods">
		<div class="menu-wrapper">
			<ul>
				<li v-for="item in goods" class="menu-item">
					<span class="text border1px">
						<i class="icon"  v-if="item.type > 0" :class="classMap[item.type]"></i>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper">
			<ul>
				<li v-for="item in goods" class="list_title">
					<h2>{{item.name}}</h2>
					<ul>
						<li v-for="food in item.foods">
							<div class="clearfix box_cont">
								<img :src="food.icon" alt="">
								<div class="right_cont">
									<h4>{{food.name}}</h4>
									<p class="desc">{{food.description}}</p>
									<p class="count">月售{{food.sellCount}}份 好评率{{food.rating}}%</p>
									<p class="price">¥<span class="now">{{food.price}}</span><span class="old" v-if="food.oldPrice">¥ <strong>{{food.oldPrice}}</strong></span></p>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
  </div>
</template>

<script>
//export   输出
export default {
	data() {
		return {
			goods: Array
		}
	},
	created (){
		this.$http.get("/api/goods").then((response) => {
			this.goods = response.body.data;
//			console.log(this.goods);
		}),
		this.classMap = ['decrease','discount','guarantee','invoice','special']
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import "../../common/mixin.scss";
	.goods {
		position: absolute;
		top: 183px;
		bottom: 48px;
		display: flex;
		width: 100%;
		overflow: hidden;
		.menu-wrapper {
			flex: 0 0 80px;
			width: 80px;
			background: #f3f5f7;
			.menu-item {
				display: table;
				padding: 0 12px;
				height: 54px;
				width: 56px;
				.text {
					display: table-cell;
					vertical-align: middle;
					line-height: 14px;
					font-size: 12px;
					font-weight: 200;
					color: rgb(7,17,27);
				
					@include border1px(rgba(7,17,27,.1));
					&>.icon {
						display: inline-block;
						vertical-align: middle;
						background-size: cover;
						width: 14px;
						height: 14px;
/*						@include bgImage("special_3");*/
						&.decrease {
							@include bgImage(decrease_3);
						}
						&.discount {
							@include bgImage(discount_3);
						}
						&.guarantee {
							@include bgImage(guarantee_3);
						}
						&.invoice {
							@include bgImage(invoice_3);
						}
						&.special {
							@include bgImage(special_3);
						}
					}
				}
			}
		}
		.goods-wrapper {
			flex: 1;
			.list_title {
				h2 {
					line-height: 26px;
					border-left: 2px solid #d9dde1;
					padding-left: 12px;
					background: #f3f5f7;
					font-size: 12px;
					color: #9ba1a6;
				}
			
				li+li {
					.box_cont {
						border-top: 1px solid grey;
					}
				}
				li {
					padding: 0 18px 0 18px;
					.box_cont {
						padding-bottom: 18px;
						padding-top: 18px;
					}
					img {
						float: left;
						margin-right: 10px;
						width: 57px;
						height: 57px;
						border-radius: 2px;
					}
					.right_cont {
						float: left;
						h4 {
							margin-top: 2px;
							line-height: 14px;
							font-size: 14px;
							color: rgb(7,17,27);
/*							background: yellowgreen;*/
						}
						.desc {
							margin-top: 8px;
							line-height: 10px;
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.count {
							margin-top: 8px;
							line-height: 10px;
							font-size: 10px;
							color: rgb(147,153,159);
							word-spacing: 12px;
						}
						.price {
							margin-top: 8px;
							color: #f01414;
							font-size: 10px;
							.now {
								margin-left: 2px;
								margin-right: 8px;
								font-weight: 700;
								font-size: 14px;
							}
							.old {
								line-height: 24px;
								text-decoration: line-through;
								font-size: 10px;
								color: #93999f;
								strong {
									font-weight: 700;
								}
							}
						}
					}
				}
			}
		}
	}
</style>