<template>
	<div class="supports" :class="[className]">
<!--		<span class="icon"  :class="classMap[0]"></span>-->
<!--		{{supports[0].description}}-->

	<ul>
		<li v-for="(item,index) in supports">
			<span class="icon" :class="classMap[supports[index].type]"></span>
			<span>{{item.description}}</span>
		</li>
	</ul>
	</div>
</template>


<script>
	export default {
			props: {
				supports: {
					return: Array
				},
				className: {
					return: String
				}
		},
		
			created(){
			this.classMap = ['decrease','discount','guarantee','invoice','special']
		}
		
	}
		

</script>


<style lang="scss" scoped>
	@import '../../common/mixin.scss';
	.supports {

			li {
				span {
					vertical-align: middle;
				}
				
				.icon {
					display: inline-block;
					width: 12px;
					height: 12px;
					background: url(invoice_1@2x.png);
					background-size: cover;
					&.decrease {
						@include bgImage(decrease_1);
					}
					&.discount {
						@include bgImage(discount_1);
					}
					&.guarantee {
						@include bgImage(guarantee_1);
					}
					&.invoice {
						@include bgImage(invoice_1);
					}
					&.special {
						@include bgImage(special_1);
					}
				}
			}
		
		&.big {
			li {
				margin-bottom: 12px;
				font-size: 12px;
				line-height: 12px;
				.icon {
					width: 16px;
					height: 16px;
					margin-right: 6px;
					&.decrease {
						@include bgImage(decrease_2);
					}
					&.discount {
						@include bgImage(discount_2);
					}
					&.guarantee {
						@include bgImage(discount_2);
					}
					&.invoice {
						@include bgImage(special_2);
					}
					&.special {
						@include bgImage(special_2);
					}
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
		
		&.big_seller {
			li {
				padding: 16px 12px;
				border-top: 1px solid rgba(7,17,27,.1);
				font-size: 12px;
				line-height: 16px;
				.icon {
					width: 16px;
					height: 16px;
					margin-right: 6px;
					&.decrease {
						@include bgImage(decrease_3);
					}
					&.discount {
						@include bgImage(discount_3);
					}
					&.guarantee {
						@include bgImage(special_3);
					}
					&.invoice {
						@include bgImage(invoice_3);
					}
					&.special {
						@include bgImage(guarantee_3);
					}
				}
				&:last-child {
					margin-bottom: 0;
				}
			}
		}
	
	}
	
</style>