<template>
	<view class="page-wrap">
		<top-navigation-bar selfTitle="代挂号成功"></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">

			<view class="tip-wrap">
				<image src="/static/images/submitRegister/success-tip.png"></image>
				<view>您的申请已成功提交!</view>
				<view>工作人员会与您尽快联系</view>
			</view>

			<view class="bottom-wrap">
				<view class="tel">
					客服电话：4009689658
				</view>
				<view class="submit-btn app-f app-aic app-jcc" @tap="goIndex">完成</view>

			</view>

		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goIndex(){
				uni.redirectTo({
				    url: '/pagesAgentRegistration/index/index'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.tip-wrap {
		position: absolute;
		left: 50%;
		top: 30%;
		transform: translateX(-50%) translateY(-50%);
		text-align: center;

		image {
			width: 158rpx;
			height: 156rpx;
		}

		view:nth-child(2) {
			font-weight: bold;
			font-size: 36rpx;
			margin-top: 40rpx;
		}

		view:nth-child(3) {
			color: #666;
			font-size: 30rpx;
			margin-top: 20rpx;
		}

	}

	.bottom-wrap {
		position: absolute;
		bottom: 100rpx;
		width: 710rpx;
		left: 50%;
		transform: translateX(-50%);

		view {
			height: 90rpx;
			width: 710rpx;

		}

		.tel {
			text-align: center;
			color: #666;
		}

		.submit-btn {

			background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
			border-radius: 44rpx;
			box-shadow: 0rpx 25rpx 36rpx 2rpx rgba(255, 151, 29, 0.19);
			color: #fff;
		}

	}
</style>
