<template>
	<view
		class="service-wrap app-f app-f-aic app-f-jcc app-f-fdc"
		@tap="advisory"
	>
		<image src="/static/images/service.png"></image>
		<view class="text">在线客服</view>
	</view>
</template>

<script>
export default {
	name: "service-btn",
	data() {
		return {};
	},
	methods: {
		advisory() {
			this.$goPage("/pages/admin/service");
		},
	},
};
</script>

<style lang="scss" scoped>
.service-wrap {
	width: 104rpx;
	height: 104rpx;
	background: #ffffff;
	border: 1rpx solid rgba(255, 114, 71, 0.15);
	border-left: none;
	border-radius: 0px 30rpx 30rpx 0px;
	box-shadow: 0rpx 8rpx 5px 0rpx rgba(255, 113, 71, 0.16);
	position: fixed;
	bottom: calc(130rpx + constant(safe-area-inset-bottom));
	bottom: calc(130rpx + env(safe-area-inset-bottom));
	left: 0;
	z-index: 99;
	image {
		height: 42rpx;
		width: 42rpx;
	}
	.text {
		font-size: 20rpx;
		color: #333333;
	}
}
</style>
