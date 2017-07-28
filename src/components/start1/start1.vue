<template>
	<div class="test1">
		我是测试组件
		{{seller1.name}}
	</div>
</template>

<script>
export default{
	props: {
		seller1: {
			return: Object
		}
	}
}

	
</script>

<style scoped  lang="scss">
	.test1 {
		font-size: 30px;
	}

</style>
