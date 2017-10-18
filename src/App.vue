<template>
	<div>
		<!-- 
			keep-alive(vue内部组件)用来缓存组件，避免多次加载相应的组件，减少性能消耗
			将首次触发请求写在created钩子函数中，就能实现缓存。
			比如列表页，去了详情页回来，还是在原来的页面。
			$route.meta可以为任意值，需要在路由配置中添加这个配置项。
		 -->
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="router-fade" mode="out-in">
			<keep-alive>
				<router-view v-if="!$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<svg-icon/>
	</div>
</template>

<script>
import svgIcon from '@/components/common/svg';

export default {
	components: { svgIcon },
}

</script>

<style lang="scss" scoped>
// 页面刚进入时、页面离开的整个过程时，页面隐藏，进入页面后(enter-to)时，页面显示出来。
.router-fade-enter-active,
.router-fade-leave-active {
	transition: opacity .3s;
}

.router-fade-enter,
.router-fade-leave-active {
	opacity: 0;
}
</style>

