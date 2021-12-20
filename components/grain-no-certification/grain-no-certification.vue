<template>
	<view class="wrap app-f app-f-aic app-f-jcc">
		<view class="content app-f app-f-fdc app-f-aic app-f-jcc">
			<image src="../../static/images/grain/no-certification.png"></image>
			<view class="text">认证后查看商品</view>
			<view
				class="btn app-f app-f-aic app-f-jcc"
				@tap="goUploadCertification"
				>去认证</view
			>
		</view>
	</view>
</template>

<script>
export default {
	methods: {
		goUploadCertification() {
			uni.navigateTo({
				url: "/userPages/certification/index",
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.wrap {
	height: 100vh;
	width: 100vw;
	image {
		width: 113rpx;
		height: 106rpx;
	}
	.text {
		font-size: 32rpx;

		color: #666666;
		margin-top: 48rpx;
	}
	.btn {
		width: 240rpx;
		height: 80rpx;

		background: #ff7247;
		border-radius: 40rpx;
		margin-top: 128rpx;
		font-size: 30rpx;

		font-weight: 700;

		color: #ffffff;
	}
}
</style>
