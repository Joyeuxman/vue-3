<template>
	<!-- ??? 此处为什么还要再写一次id=app，以及router-view标签 -->
	<div>
		<transition name="router-fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
// ???此处什么都没有导出，是因为没有别的组件引用吗
export default {

}

</script>

<style lang="less" scoped>
.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
</style>

