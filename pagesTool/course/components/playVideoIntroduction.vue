<template>
	<view class="img-wrap">
		<block v-for="(img, index) in list" :key="index">
			<image :src="img" mode="widthFix"></image>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			default: [],
			type: Array,
		},
	},
};
</script>

<style scoped lang="scss">
.img-wrap {
	width: 100%;
	image {
		width: 100%;
	}
}
</style>
