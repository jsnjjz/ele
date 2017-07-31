<template>
	<div class="star" :class="[typeSize]">
		<ul>
			<li class="star-item" v-for="item in classItem" :class="item"></li>
		</ul>
	</div>
</template>


<script>
	const LENGTH = 5;  //定义星星的数量
	export default {
		
		props: {
			score: {
				return: Number
			},
			size: {
				type: Number
			}
		},
		computed: {
			typeSize() {
      	return 'type' + this.size
    	},
			classItem() {
				let result = [];//用来存储数组 on half off
				let score = Math.floor(this.score*2)/2;
				//进行取中运算 0.4之前的全部为 0  0.5-0.9之间为 0.5
				
				let hasDecimal = score%1 !== 0;
				//判断是否有小数
				
				let integer = Math.floor(score);
				//存储整数
			
				
				
				for(let i=0; i<integer; i++){
					result.push("on");
				};
				if(hasDecimal){
					result.push("half");
				}
				while (result.length < LENGTH){
					result.push("off");
				}
				return result;
			}
		}
	}
</script>


<style scoped lang="scss">
	@import "../../common/mixin.scss";
	.star {
		text-align: center;
		font-size: 0;
		.star-item {
			display: inline-block;
			margin-right: 16px;
			width: 24px;
			height: 24px;
			background-size: cover;
			&:last-child{
				margin-right: 0;
			}
		}
			&.type24 {
				.star-item{
					&.on{
						@include bgImage(star24_on);
					}
					&.half{
						@include bgImage(star24_half);
					}
					&.off{
						@include bgImage(star24_off);
					}
      	}
			}
			
			
			&.type36{
				.star-item{
					margin-right: 20px;
					width: 16px;
					height: 16px;
					&:last-child{
						margin-right: 0;
					}
					&.on{
						@include bgImage(star36_on);
					}
					&.half{
						@include bgImage(star36_half);
					}
					&.off{
						@include bgImage(star36_off);
					}
				}
			}
			
			
			&.type48{
				.star-item{
					margin-right: 10px;
					width: 10px;
					height: 10px;
					&:last-child{
						margin-right: 0;
					}
					&.on{
						@include bgImage(star48_on);
					}
					&.half{
						@include bgImage(star48_half);
					}
					&.off{
						@include bgImage(star48_off);
					}
				}
			}
			
			
		
	}
</style>