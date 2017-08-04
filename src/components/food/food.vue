<template>
	<div class="food">
		{{food}}
	</div>
</template>

<script>
	export default{
		props: {
			food:{
				return:Object
			}
		}
	}
</script>


<style>
	.food{
		background: red;
	}
</style>