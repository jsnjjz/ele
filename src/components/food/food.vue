<template>
	<transition name="move">
		
		<div class="food" v-show="showFlag" ref="food">
				
				<div>
					<div v-show="food" class="image-header">
						<img :src="food.image" alt="">
						<div class="back" @click="hide">
							<i class="iconfont icon-arrow_lift"></i>
						</div>
					</div>

					<div class="content">
						<h1 class="title">{{food.name}}</h1>
						<div class="detail">
							<span class="sell-count">月销{{food.sellCount}}份</span><!--
							--><span class="rating">好评率{{food.rating}}%</span>
						</div>
						<div class="price">
							<span class="now"><i>¥</i> {{food.price}}</span>
							<span class="old" v-if="food.oldPrice"><i>¥</i> {{food.oldPrice}}</span>
						</div>
						
							<div class="carcontrol-wrap">
								<carcontrol :food="food"></carcontrol>
							</div>
							<transition name="fade">
								<div class="buy" @click.stop.prevent="addFirst($event)" v-show="!food.count ||food.count === 0">
									加入购物车
								</div>
							</transition>
						
					</div>

					<div class="introduction">
						<h2 class="title">商品介绍</h2>
						<p>{{food.info}}</p>
					</div>
					
					<ratingselect :ratings="food.ratings" :selectType="selectType" :onlyContent="onlyContent"></ratingselect>
					
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needshow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" width="12" height="12" alt="" class="avatar">
								</div>
								<div class="time">{{format(rating.rateTime)}}</div>
								<p class="text">
								<span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down': rating.rateType===1}"></span>
								{{rating.text}}
							</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
					
				</div>
				
		</div>
		
	</transition>
</template>

<script>
	import BScroll from "better-scroll"
	
	import Vue from "vue"
	
	import carcontrol from '../carcontrol/carcontrol.vue'
	
	import ratingselect from '../ratingselect/ratingselect.vue'
	
	export default{
		components: {
			carcontrol: carcontrol,
			ratingselect
		},
		props: {
			food:{
				return:Object
			}
		},
		data (){
			return {
				showFlag: false,
				selectType: 2,
				onlyContent: false
			}
		},
				
		methods: {
			show (){
				this.showFlag = true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click: true
						})
					}else {
						this.scroll.refresh()
					}
				})
			},
			hide (){
				this.showFlag = false;
			},
			addFirst (event){
			if(!event._constructed){
				return
			};
				Vue.set(this.food,"count",1)
			},
			
			needshow(type,text){
				if(this.onlyContent && !text){
					return false
				}
				if(this.selectType === 2){
					return true
				}else {
					//type       rating.type
					return type === this.selectType
				}
			},
			format(date){
				var date = new Date(date);//如果date为13位不需要乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
				return Y+M+D+h+m+s;
			}
			
		},
		watch: {
			'selectType'(type){
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			},
			'onlyContent'(onlyContent){
				this.$nextTick(() => {
					this.scroll.refresh();
				})
			}
		}
	}
</script>


<style scoped lang="scss">
	.food{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
		overflow: hidden;
		background: #f3f5f7;

		.image-header{
        position: relative;
        width: 100%;  
        height: 0;
        padding-top: 100%;
        img{
          position: absolute;
          left:0;
          top:0;
          width: 100%;
          height: 100%;
        }
        .back{
          position: absolute;
          top: 10px;
          left: 10px;
          background-color:rgba(0,0,0,.9);
          border-radius: 50%;
        }
        .icon-arrow_lift{
          display:block;
          padding: 10px;
          font-size: 20px;
          color:#fff;
        }
      }
		

	.content {
			position: relative;
			margin-bottom: 16px;
			padding: 18px;
			border-bottom: 2px solid rgba(7,17,27,.1);
			background: #fff;
			overflow: hidden;
			.title {
				line-height: 14px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(7,17,27);
			}
			.detail {
				margin-top: 8px;
				margin-bottom: 18px;
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 12px;
				span+span {
					margin-left: 12px;
				}
			}
			
		.price {
/*				float: left;*/
				i {
					font-size: 10px;
					font-style: normal;
				}
			.now {
				line-height: 24px;
				font-size: 14px;
				font-weight: 700;
				color: rgb(240,20,20);

			}
			.old {
				font-size: 10px;
				line-height: 24px;
				color: rgb(147,153,159);
			}
		}
			.carcontrol-wrap {
				position: absolute;
				right: 18px;
				bottom: 18px;
			}

			.buy {
				position: absolute;
				z-index: 10;
				right: 18px;
				bottom: 18px;
				width: 78px;
				height: 24px;
				border-radius: 12px;
				background: rgb(0,160,220);
				font-size: 10px;
				line-height: 24px;
				text-align: center;
				color: rgb(255,255,255);
				&:after {
					content: "";
					display: block;
					clear: both;
				}
			}
		
		}

		
		.introduction {
			margin-bottom: 16px;
			padding: 18px;
			border-top: 2px solid rgba(7,17,27,.1);
			border-bottom: 2px solid rgba(7,17,27,.1);
			background: #fff;
			h2 {
				font-size: 16px;
				color: #07111b;
			}
			p {
				margin-top: 6px;
				padding-left: 8px;
				padding-right: 8px;
				line-height: 24px;
				font-size: 12px;
				color: rgb(77,85,93);
			}
		}
		
		.rating-wrapper{
        padding: 0 18px;
        .rating-item{
          position: relative;
          padding: 16px 0;
					border-bottom: 1px solid rgba(7,17,27,.1);
          .user{
            position: absolute;
            right:0;
            top:16px;
            line-height: 16px;
            font-size: 0;
            .name{
              display:inline-block;
              margin-right:6px;
              vertical-align: top;
              font-size: 10px;
              color:rgb(147,153,159);
            }
            .avatar{
              border-radius:50%;
            }
          }
          .time{
            margin-bottom:6px;
            line-height: 12px;
            font-size: 10px;
						color: #b7bbbf;
          }
          .text{
            line-height: 16px;
            font-size: 12px;
            color: rgb(7,17,27);
            .icon-thumb_up,.icon-thumb_down{
              margin-right: 4px;
              line-height: 24px;
              font-size: 12px;
            }
            .icon-thumb_up{
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down{
              color: #b7bbbf;
            }
          }
        }
      }
      .no-rating{
        padding: 16px 0;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
		
	}
	.move-enter-active, .move-leave-active{
		transition: all 0.2s linear;
		transform: translate3D(0,0,0);
	}
	.move-enter,.move-leave-active{
		transform: translate3D(100%,0,0);
	}
	
	.fade-enter-active, .fade-leave-active{
		transition: all 0.2s;
	}
	.fade-enter, .fade-leave-active{
		opacity: 0;
		z-index: -1;
	}
</style>