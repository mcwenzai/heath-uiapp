<template>
	<view>
		<web-view :src="this.pageUrl"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageUrl: "",
		};
	},
	onLoad(options) {
		const dataStr = options.params;
		const data = JSON.parse(decodeURIComponent(dataStr));
		this.pageUrl = data.pageUrl;
	},
};
</script>

<style lang="scss" scoped></style>
