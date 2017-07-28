<template>
	<div class="test3">
		test3
		{{test3.name}}
	</div>
</template>

<script>
	export default {
		props: {
			test3: {
				return: Object
			}
		}
	}
</script>


<style scoped lang="scss">
	.test3 {
		font-size: 30px;
	}
</style>