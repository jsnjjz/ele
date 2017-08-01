<template>
  <div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
					<span class="text border1px">
						<i class="icon"  v-if="item.type > 0" :class="classMap[item.type]"></i>
						{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="goods-wrapper" ref="foodWrapper">
			<ul>
				<li v-for="item in goods" class="list_title food-list-hook">
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
		
		<div class="shopcar_wrapper">
			<shopcar>
			
			</shopcar>
		</div>
		
		
		
  </div>
</template>

<script>
	import BScroll from "better-scroll"
	
	import shopcar from '../shopcar/shopcar.vue'
//export   输出
export default {

components: {
	shopcar:shopcar
},
	data() {
		return {
			goods: Array,
			listHeight: [],
			scrollY: 0
		}
	},
	created (){
		this.$http.get("/api/goods").then((response) => {
			this.goods = response.body.data;
//			console.log(this.goods);
			
			this.$nextTick(() => {
				this._initScroll();
				this._calculateHeight();
//				this.currentIndex();
			})
		}),
		this.classMap = ['decrease','discount','guarantee','invoice','special']
	},
	methods: {
		_initScroll() {
			this.menuScroll = new BScroll(this.$refs.menuWrapper, {
				click: true
			});
			this.foodScroll = new BScroll(this.$refs.foodWrapper, {
				probeType: 3
			});
			
			this.foodScroll.on('scroll',(pos) => {
				 this.scrollY = Math.abs(Math.floor(pos.y));
//				console.log(this.scrollY);
			})
		},
		_calculateHeight() {
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');    //类数组
			let height = 0;
			this.listHeight.push(height);
			for (let i = 0; i < foodList.length; i++) {
				let item = foodList[i];
				height += item.clientHeight;
				this.listHeight.push(height);
			}
//				console.log(this.listHeight); 
		},
		selectMenu(index,event){
			if(!event._constructed){
				return
			}
			console.log(event);
			
			let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
			
			let ele = foodList[index];
			
			this.foodScroll.scrollToElement(ele,300)
		}
		
	},
	computed: {
		currentIndex(){
			for(let i=0; i<this.listHeight.length; i++){
				let height1 = this.listHeight[i];
				let height2 = this.listHeight[i+1];

				if(!height2 || (this.scrollY>=height1 && this.scrollY < height2)){
					return i
				}
			}
			return 0;
		}
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
				&.current {
					z-index: 10;
					margin-top: -1px;
					background: green;
					font-weight: 700
				}
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
						max-width: calc(100% - 67px);
						h4 {
							margin-top: 2px;
							line-height: 14px;
							font-size: 14px;
							color: rgb(7,17,27);
/*							background: yellowgreen;*/
						}
						.desc {
							margin-top: 8px;
							line-height: 14px;
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
		
		.shopcar_wrapper {
			position: fixed;
			background: hotpink;
		}
	}
</style>