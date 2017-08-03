<template>
  <div class="seller" ref="menuWrapper">
  	
		<div class="wrap">

				<div class="title">
					<div class="box clearfix">
						<div class="left pull-left">
							<h2>{{seller.name}}</h2>
							<istar :score="seller.serviceScore" :size="36"></istar>
							<span>(<i style="font-style: normal">{{seller.ratingCount}}</i>)</span><span>月售{{seller.sellCount}}单</span>
						</div>                  
						<div class="right pull-right" :class="{'active': seen1}" @click="seen1 = !seen1">
							<i class="iconfont icon-favorite"></i>
							<p v-if="!seen1">收藏</p>
							<p v-else>已收藏</p>
						</div>
					</div>
					<div class="info">
						<div>
							<p>起送价</p>
							<p><span>{{seller.minPrice}}</span>元</p>
						</div>
						<div>
							<p>商家配送</p>
							<p><span>{{seller.deliveryPrice}}</span>元</p>
						</div>
						<div>
							<p>平均配送时间</p>
							<p><span>{{seller.deliveryTime}}</span>分钟</p>
						</div>
					</div>
				</div>

				<div class="bulletin">
					<h2>公告与活动</h2>
					<p>{{seller.bulletin}}</p>	
					<div class="supports_wrapper">
						<supports11 v-if="seller.supports" :supports="seller.supports" :className="big1" class=""></supports11>
					</div>
				</div>

				<div class="seller_pic">
					<h2>商家实景</h2>
					<div id="box">
						<swiper :options="swiperOption">
							<swiper-slide v-for="item in seller.pics" class="iPic">
								<img v-if="seller.pics" :src="item" alt="" class="iImg">
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>		
					</div>
				</div>

				<div class="seller_info">
					<h2>商家信息</h2>
					<ul>
						<li v-for="item in seller.infos">
							<span>{{item}}</span>
						</li>
					</ul>
				</div>

			</div>
  
  </div>
</template>

<script>
	import star from '../star/star.vue'
	
	import shopcar from '../shopcar/shopcar.vue'
	
	import supports from '../supports/supports.vue'
	
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	
	import BScroll from "better-scroll"
	
	export default {
		name: 'carrousel',
		props: {
			seller: {
				return: []
			}
		},
		components: {
			istar: star,
			shopcar: shopcar,
			supports11: supports,
			
			swiper,
    	swiperSlide
  },
		
		data() {
				return {
				big1: "big_seller",
				seen1: false,
				swiperOption: {
//          pagination: '.swiper-pagination',
          paginationClickable: true,
          slidesPerView: 5,
          spaceBetween: 50,
          breakpoints: {
            1024: {
              slidesPerView: 4,
              spaceBetween: 12
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 0
            },
             640: {
              slidesPerView: 2.5,
              spaceBetween: 0
            },
            320: {
              slidesPerView: 2,
              spaceBetween: 0
            }
          }
        }
			}
		},
		watch:{
			"seller"(){
				this._initScroll();
			}
		},
		mounted(){
			this._initScroll();
		},
		created (){
			this.$nextTick(() => {
				this._initScroll();
			})
		},
		methods: {
			_initScroll(){
				this.$nextTick(()=>{
					console.log(this.$refs.menuWrapper);
					this.menuScroll = new BScroll(this.$refs.menuWrapper, {
						click: true
					});
				})
			}
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../common/mixin.scss';
	.seller {
		background: #f3f5f7;
		position: absolute;
		top:183px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
		
		.title {
			padding: 18px 18px 0 18px;
			border-top: 1px solid #e6e7e8;
			border-bottom: 2px solid #e6e7e8;
			background: #fff;
			.box {
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7,17,27,.1);
					h2 {
						margin-bottom: 8px;
						line-height: 14px;
						font-size: 14px;
						color: rgb(7,17,27);
					}
					.star {
						display: inline-block;
						margin-right: 8px;
					}
					> span {
						line-height: 18px;
						font-size: 10px;
						color: rgb(77,85,93);
						i {
							font-style: normal;
						}
					}
					span+span {
						margin-left: 12px;
					}
				
				.right {
					text-align: center;
					i {
						line-height: 24px;
						font-size: 24px;
						color: rgb(77,85,93);
					}
					p {
						margin-top: 4px;
						line-height: 10px;
						font-size: 10px;
						color: rgb(77,85,93);
					}
					&.active {
						i {
							color: rgb(240,20,20);
						}
					}
				}
			}
			.info {
				display: flex;
				padding-top: 18px;
				padding-bottom: 18px;
				>div {
					flex: 1;
					text-align: center;
					line-height: 12px;
					font-size: 10px;
					color: rgb(147,153,159);
					p+p {
						margin-top: 4px;
						font-size: 10px;
						line-height: 12px;
						color: rgb(7,17,27);
						span {
							line-height: 24px;
							font-size: 24px;
						}
					}
				}
				div+div {
					border-left: 1px solid rgba(7,17,27,.1);
				}
			}
		}
		.bulletin {
			margin-top: 16px;
			margin-bottom: 16px;
			padding: 18px 18px 0 18px;
			background: #fff;
			h2 {
				margin-bottom: 8px;
				line-height: 14px;
				font-size: 14px;
				color: rgb(7,17,27);
			}
			p {
				padding: 0 12px 16px 12px;
				line-height: 24px;
				font-size: 12px;
				color: rgb(240,20,20);
				font-weight: 200;
			}
			
			.supports_wrapper {
				li {
					border-top: 1px solid rgba(7,17,27,.1);
				}
			}
		}
		
		.seller_pic {
			margin-bottom: 16px;
			padding: 18px;
			border-top: 2px solid #e6e7e8;
			border-bottom: 2px solid #e6e7e8;
			background: #fff;
			#box {
				margin-top: 12px;
				overflow: hidden;
				.iImg {
					width: 120px;
					height: 90px;
				}
			}
		}
		
		
		.seller_info {
			padding-top: 18px;
			padding-left: 18px;
			padding-right: 18px;
			border-top: 2px solid #e6e7e8;
			background: #fff;
			h2 {
				margin-bottom: 12px;
				line-height: 14px;
				font-size: 14px;
				color: rgb(7,17,27);
			}
			ul {
				li {
					padding: 16px 12px;
					border-top: 1px solid rgba(7,17,27,.1);
					line-height: 16px;
					font-size: 12px;
					font-weight: 200;
					color: rgb(7,17,27);
				}
			}
			
			
		}
	}
</style>