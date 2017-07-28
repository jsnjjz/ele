<template>
	<div class="test2">
		test2
		{{seller333.name}}
	</div>
</template>


<script>
	export default{
	props: {
		seller333: {
			return: Object
		}
	}
}
</script>


<style scoped  lang="scss">
	.test2 {
		font-size: 30px;
	}
</style>