<template>
	<div class="supports">
<!--		<span class="icon" :class="classMap[index]"></span>-->
<!--
	<ul>
		<li v-for="(item,index) in supports">
		<span class="icon" :class="classMap[supports[index].type]"></span>
		{{item.description}}
		</li>
	</ul>
-->
		{{supports[0].description}}
	</div>
</template>


<script>
	export default {
			props: {
				supports: {
					return: Array
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
		.icon {
			display: inline-block;
			width: 12px;
			height: 12px;
			background: url(invoice_1@2x.png);
			background-size: cover;
/*				background-image: url(decrease_1@2x.png);*/
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
	
</style>