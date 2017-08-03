<template>
  <div class="ratings">
		<div class="box">
			
			<div class="top_score">
				<div class="integrated_score">
					<p>{{seller.score}}</p>
					<p>综合评分</p>
					<p>高于周边商家{{seller.rankRate}}%</p>
				</div>
				
				<div class="sort_score">
					<div class="box">
						<div class="first">
							<span>服务态度</span>

								<istar :score="seller.serviceScore" :size="36"></istar>

							<span class="thi_score">
								{{seller.serviceScore}}
							</span>
						</div>
						<div class="second">
							<span>
								食物口感
							</span>
							<span>
								<istar class="star1"  :score="seller.foodScore" :size="36"></istar>
							</span>
							<span class="thi_score">
								{{seller.foodScore}}
							</span>
						</div>
						<div class="third">
							<span>送达时间</span>
							<span>{{seller.deliveryTime}}分钟</span>
						</div>
					</div>
				</div>
			</div>
			
			<div class="assess_cont">
				<div class="desc_box">
					<div class="desc">
						<span @click="whole">全部 {{all.length}}</span>
						<span @click="hight">满意 {{highScore.length}}</span>
						<span @click="low">不满意 {{lowScore.length}}</span>
					</div>

					<div class="filter" @click="show"  :class="{'active': seen}">
						<i class="iconfont icon-check_circle"></i>
						<span>只看有内容的评价</span>
					</div>
				</div>
				<div class="cont_box">
					<ul>

						<li v-for="item in ratings">
							<div class="ava pull-left">
								<img :src="item.avatar" alt="">
							</div>
							<div class="cont pull-left">
								<p class="name">{{item.username}} <span>2016-07-13 20:33</span></p>
								<div class="del_time">
									<istar :score="item.score" :size="48"></istar><span>{{item.deliveryTime}}<i v-if="item.deliveryTime" style="font-style: normal">分钟送达</i></span>
								</div>
								<p class="comment">{{item.text}}</p>
								<div class="type">
									<i v-if="item.score > 3" class="iconfont icon-thumb_up" style="color: rgb(0,160,220)"></i>
									<i v-else class="iconfont icon-thumb_down"></i>
									<div class="btn">
										<span v-for="list in item.recommend">{{list}}</span>
									</div>
								</div>
							</div>
						</li>
						
						
<!--
						<li v-show="seen" v-for="item in box">
							<div class="ava pull-left">
								<img :src="item.avatar" alt="">
							</div>
							<div class="cont pull-left">
								<p class="name">{{item.username}} <span>2016-07-13 20:33</span></p>
								<div class="del_time">
									<istar :score="item.score" :size="48"></istar><span>{{item.deliveryTime}}<i v-if="item.deliveryTime" style="font-style: normal">分钟送达</i></span>
								</div>
								<p class="comment">{{item.text}}</p>
								<div class="type">
									<i v-if="item.score > 3" class="iconfont icon-thumb_up" style="color: rgb(0,160,220)"></i>
									<i v-else class="iconfont icon-thumb_down"></i>
									<div class="btn">
										<span v-for="list in item.recommend">{{list}}</span>
									</div>
								</div>
							</div>
						</li>
-->
						
					</ul>
				</div>
				
			</div>
		</div>
		

<!--
		<div class="shopcar_wrapper">
			<shopcar :delivery="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods">
			</shopcar>
		</div>
-->
				
		
		
  </div>
</template>

<script>
	import star from '../star/star.vue'
	
	import shopcar from '../shopcar/shopcar.vue'
	
export default {
	props: {
		seller: {
			return: []
		}
	},
	components: {
		istar: star,
		shopcar: shopcar
	},
	
	data() {
		return {
			goods:[],	
			ratings: [],
			ratings1: [],
			all: [],
			highScore: [],
			lowScore: [],
			seen: false,
			box: [],
			sta: 1
		}
	},
	methods: {
		show (){
//			this.seen = !this.seen;
			if(this.sta == 1){
				this.ratings = this.box;
				this.sta = 0;
				this.seen = true;
//				console.log(this.seen)
			}else if(this.sta == 0){
				this.ratings = this.ratings1;
				this.sta = 1;
				this.seen = false;
//				console.log(this.seen);
			}
		},
		whole (){
			this.ratings = this.ratings1;
			this.seen = false;
			this.sta = 1;
//			console.log(this.seen)
		},
		hight (){
//			let arr2 = [];
//			this.ratings1.forEach((item) => {
//				if(item.score >= 4){
//					arr2.push(item);
//				}
//			})
			this.ratings = this.highScore;
			this.seen = false;
			this.sta = 1;
//			console.log(this.seen)
		},
		low (){
			this.ratings = this.lowScore;
			this.seen = false;
			this.sta = 1;
//			console.log(this.seen)
		}
	},
	
	created (){
		this.$http.get("/api/ratings").then((response) => {
			this.ratings = response.body.data;
			this.ratings.forEach((item) => {
				this.all.push(item.score);
			});
			this.ratings.forEach((item) => {
				if(item.score > 3){
					this.highScore.push(item);
				}
			});
			this.ratings.forEach((item) => {
				if(item.score <= 3){
					this.lowScore.push(item);
				}
			});
			
			this.ratings.forEach((item) => {
				if(item.text){
					this.box.push(item);
				}
			});
			
			
			this.ratings1 = this.ratings;
			
			
		})
//		this.$http.get("/api/goods").then((response) => {
//			this.goods = response.body.data;
//		})
	},
//		computed:{
//				selectFoods (){
//				let foodList = [];
//				//this.goods = data
//				this.goods.forEach((item) => {
//					//item.foods = foods
//					item.foods.forEach((food) => {
//						//如果有count值 就push到foodList
//						if(food.count){
//							foodList.push(food);
//						}
//					})
//				})
//				return foodList
//			}
//		}
	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../common/mixin.scss';
	.ratings {
		background: #f3f5f7;
		.top_score {
			width: 100%;
			padding-top: 18px;
			padding-bottom: 18px;
			margin-bottom: 16px;
			overflow: hidden;
			border-bottom: 2px solid #e6e7e8;
			background: #fff;
			.integrated_score {
				float: left;
				width: 36.66666666%;
				margin: -1px;
				padding-top: 6px;
				border-right: 1px solid #e6e7e8;
				text-align: center;
				:nth-child(1) {
					line-height: 24px;
					font-size: 24px;
					color: rgb(255,153,0);
				}
				:nth-child(2) {
					margin-top: 6px;
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 12px;
				}
				:nth-child(3) {
					margin-top: 8px;
					padding-bottom: 6px;
					line-height: 10px;
					font-size: 12px;
					color: #93999f;
				}
			}
			.sort_score {
				float: right;
				width: 63.44444444%;
				text-align: center;
				.box {
					display: inline-block;
				}
				.star {
					display: inline-block;
					vertical-align: middle;
				}
				.first {
					>:nth-child(1){
						margin-right: 12px;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
						vertical-align: middle;
					}

					>:nth-child(3) {
						margin-left: 12px;
						font-size: 12px;
						color: rgb(250,153,0);
						vertical-align: middle;
					}
				}
				.second {
					margin-top: 6px;
					>:nth-child(1){
						margin-right: 13px;
						line-height: 18px;
						font-size: 12px;
						color: rgb(7,17,27);
							vertical-align: middle;
					}

					>:nth-child(3) {
						margin-left: 10px;
						font-size: 12px;
						color: rgb(250,153,0);
						vertical-align: middle;
					}
				}
				.third {
					text-align: left;
					margin-top: 6px;
					font-size: 12px;
					color: rgb(7,17,27);
					>:nth-child(2) {
						margin-left: 14px;
						color: rgb(147,153,159);
					}
				}
			}
		}
		.assess_cont {
			background: #fff;
			.desc_box {
				border-top: 2px solid #e6e7e8;
				border-bottom: 2px solid #e6e7e8;
				padding-left: 17px;
				padding-right: 17px;
				.desc {
					line-height: 68px;
					span {
						margin-right: 8px;
						padding: 10px;
						font-size: 14px;
					}
					:nth-child(1){
						background: #00a0dc;
						color: #fff;
					}
					:nth-child(2){
						background: #ccecf8;
						color: #58636b;
					}
					:nth-child(3){
						background: #e9ebec;
						color: #58636b;
					}
				}
				.filter {
					line-height: 48px;
					border-top: 2px solid #e6e7e8;
					color: #93999f;
					font-size: 10px;
					.iconfont {
						vertical-align: -4px;
						font-size: 20px;
					}
					&.active {
						color: rgb(7,17,27);
						.iconfont {
							color: #00a0dc;
						}
					}
				}
				
			}
			.cont_box {
				padding-left: 18px;
				padding-right: 18px;
/*
				li+li {
					border-top: 1px solid #e6e7e8;
				}
*/
				li {
					padding-top: 18px;
					padding-bottom: 18px;
					overflow: hidden;
					border-bottom: 1px solid #e6e7e8;
					.ava {
						margin-right: 12px;
						img {
							width: 28px;
							height: 28px;
							border-radius: 50%;
						}
					}
					.cont {
						width: calc(100% - 40px);
						.name {
							line-height: 12px;
							overflow: hidden;
							font-size: 10px;
							span {
								float: right;
								color: #c3c6c9;
							}
						}
						.del_time {
							margin-top: 4px;
							.star {
								display: inline-block;
								margin-right: 6px;
							}
							span {
								font-size: 10px;
								font-weight: 200;
								color: rgb(147,153,159);
								line-height: 12px;
							}
						}
						.comment {
							margin-top: 6px;
							line-height: 18px;
							font-size: 14px;
							color: rgb(7,17,27);
						}
						.type {
							overflow: hidden;
							i {
								float: left;
								margin-top: 8px;
								line-height: 16px;
								margin-right: 8px;
								font-size: 12px;
								color: rgb(183,187,191);
								vertical-align: -4px;
							}
							.btn {
								float: left;
								width: calc(100% - 20px);
								span {
									float: left;
									margin-top: 8px;
									padding: 0 6px;
									margin-right: 6px;
									font-size: 9px;
									color: rgb(147,153,159);
									line-height: 16px;
									border: 1px solid #e6e7e8;
									max-width: 62px;
									overflow: hidden;
									text-overflow: ellipsis;
									white-space: nowrap;
								}
							}
							
						}
					}
			}
		}
	}
		.shopcar_wrapper {
			position: fixed;
			bottom: 0;
			left: 0;
		}
}
</style>