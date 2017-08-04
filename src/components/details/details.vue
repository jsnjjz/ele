<template>
	<div class="details" v-if="goods.name">
		{{goods}}
		dsadas
	</div>
</template>



<script>
	export default	{
		props: {
			goods: {
				return: Object
			}
		}
	}
</script>


<style scoped lang="scss">
	@import '../../common/mixin.scss';
	.details{
		position: absolute;
		left: 0;
		top: 0;
		background: red;
	}
</style>