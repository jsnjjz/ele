<template>
	<div class="box">
		{{seller11.name}}
	</div>
</template>


<script>
	export default {
		props: {
			seller11: {
				return: Object
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		font-size: 30px;
		color: green;
	}
</style>
