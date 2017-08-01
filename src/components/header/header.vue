<template>
  <div class="header">
		<div class="head_box clearfix">        
			<img width="64" height="64" :src="seller1.avatar" alt="">
			                           <!--:src 因为 seller1是一个 对象 需要对其做个判断-不为空时  就渲染-->
			                           
			<div class="box_right">
				<h2><span class="brand"></span><span>{{seller1.name}}</span></h2>
				<p class="desc">
					{{seller1.description}}/{{seller1.deliveryTime}}分钟送达
				</p>
				<div class="supports_wrapper">
						<!--加v-if 因为这个数据是异步加载进来的  开始时  他是个 空对象-->
					<supports11 v-if="seller1.supports" :supports="seller1.supports"></supports11>
				</div>
			</div>
			
			
		</div>
		
		<div class="counter_wrap">
			<div class="counter" v-if="seller1.supports" @click="showDetail">	
				<span>{{seller1.supports.length}}个</span>
				<i class="iconfont  icon-keyboard_arrow_right"></i>
			</div>
		</div>
		
		<div class="bulltin-wrapper" @click="showDetail">
			<p><span></span>{{seller1.bulletin}}</p>
			<i class="iconfont  icon-keyboard_arrow_right"></i>
		</div>
		
		
		<div class="background">
			<div class="over_bg">
				<img :src="seller1.avatar" alt="">
			</div>
		</div>
		
		<transition  name="fade">
			<div class="detail_wrapper" v-show="detailshow" @click="closeDetail">
				<div class="detail">
					<div class="txt_box">
							<h2>{{seller1.name}}</h2>
							
							<div class="star-wrapper">
								<istar :score="seller1.score" :size="24"></istar>
<!--
								<istar :score="seller1.score" :size="36"></istar>
								<istar :score="seller1.score" :size="48"></istar>
-->
							</div>
							
							<div class="title">
								<div class="line"></div>
								<div class="text">优惠信息</div>
								<div class="line"></div>
							</div>
							
							<div class="supports_wrapper">
									<!--加v-if 因为这个数据是异步加载进来的  开始时  他是个 空对象-->
								<supports11 v-if="seller1.supports" :supports="seller1.supports" :className="big1"></supports11>
							</div>
							
							<div class="title">
								<div class="line"></div>
								<div class="text">商家公告</div>
								<div class="line"></div>
							</div>
							
							<div class="bulletin">
								{{seller1.bulletin}}
							</div>
					</div>
					<div class="close">
						<i class="iconfont icon-close"></i>
					</div>
				</div>
			</div>
		</transition>
		
  </div>
</template>

<script>

import supports from '../supports/supports.vue'
import star from '../star/star.vue'
	
export default {
	props: {
		seller1: {
			return: Object       
		}
	},
	data () {
		return {
			detailshow: false,
			big1: "big"
		}
	},
	methods: {
		showDetail (){
//			alert("1");
			this.detailshow = true;
		},
		closeDetail (){
			this.detailshow = false;
		}
	},
	components: {
		supports11: supports,
		istar: star
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../../common/mixin.scss';
	.header {
		position: relative;
		height: 143px;
		background: rgba(7,17,27,.5);
		.head_box {
			padding-left: 24px;
			padding-top: 24px;
			padding-right: 12px;
			padding-bottom: 18px;
			img {
				float: left;
				margin-right: 16px;
				border-radius: 3px;
			}
			.box_right {
				height: 60px;
				margin-top: 2px;
				color: #fff;
				h2 {
					font-size: 16px;
					.brand {
						display: inline-block;
						margin-right: 6px;
						width: 30px;
						height: 18px;
						@include bgImage("brand");
						background-size: cover;
					}
					span {
						vertical-align: middle;
					}
				}
				.desc {
					margin-top: 8px;
					font-size: 12px;
				}

				.supports_wrapper {
					margin-top: 10px;
					font-size: 10px;
					height: 14px;
					overflow: hidden;
				}
			}

	}
		
		.counter_wrap {
			position: absolute;
			right: 12px;
			bottom: 43px;
			.counter {
				padding: 7px 8px;
				line-height: 12px;
				font-size: 10px;
				font-weight: 200;
				color: #fff;
				background-color: rgba(0,0,0,.2);
				border-radius: 24px;
				overflow: hidden;
				span {
					float: left;
				}
				i {
	/*				display: inline-block;*/
					float: left;
				}
			}
		}
		
		.bulltin-wrapper {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 28px;
			background: rgba(67,67,70,.4);
			line-height: 28px;
			color: #fff;
			p {
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				padding-left: 12px;
				padding-right: 26px;
				font-size: 10px;
				span {
					display: inline-block;
					vertical-align: middle;
					margin-top: -2px;
					margin-right: 4px;
					width: 24px;
					height: 13px;
					background-size: cover;
					@include bgImage("bulletin");
					border-radius: 2px;
				}
			}
			i {
				position: absolute;
				right: 12px;
				top: 6px;
			}
		}
		.background {
			position: absolute;
			z-index: -1;
			left: 0;
			top: 0;
			width: 100%;
			height: 143px;
			overflow: hidden;
			filter: blur(10px);
			img {
				width: 100%;
				height: 100%;
			}
		}
		
		.detail_wrapper {
			z-index: 10;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto;  
			background: rgba(7,17,27,.7);
			.detail {
				position: relative;
				min-height: 100%;
				backdrop-filter: blur(10px);
				color: #fff;
				.txt_box {
					padding-bottom: 180px;
					padding-left: 20px;
					padding-right: 20px;
					overflow: hidden;
					color: #fff;
					h2 {
						margin-top: 64px;
						line-height: 16px;
						font-size: 16px;
						font-weight: 700;
						text-align: center;
					}
					.star-wrapper {
						margin: 16px auto 0 auto;
					}
					.title {
						display: flex;
						margin-top: 28px;
						margin-bottom: 24px;
						.line {
							position: relative;
							top: -7px;
							flex: 1;
							border-bottom: 1px solid rgba(255,255,255,.2);							
						}
						.text {
							padding: 0 12px;
							line-height: 14px;
							font-size: 14px;
							font-weight: 700
						}
					}
					
					.bulletin {
						margin-left: 12px;
						margin-right: 12px;
						font-size: 12px;
						font-weight: 200;
						line-height: 24px;
					}
				}
				.close {
					position: absolute;
					width: 100%;
					text-align: center;
					bottom: 36px;
					font-size: 32px;
					color: rgba(255,255,255,.5);
				}
			}

		}
		
		.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s
		}
		.fade-enter, .fade-leave-to 
			/* .fade-leave-active in below version 2.1.8 */ {
  		opacity: 0
		}
		
}
</style>