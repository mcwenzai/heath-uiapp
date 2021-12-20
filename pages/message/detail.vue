<template>
	<view class="content page-height">
		<view class="title flex-center-center">{{ info.title }}</view>
		<!-- <view>{{info.title}}：</view> -->
		<view class="info-item">
			<!-- <view>【授权通过商品】</view> -->
			<text>{{ info.content }}</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
			messageId: null,
		};
	},
	onLoad(options) {
		this.messageId = options.messageId;
		uni.setStorageSync("messageDetail", true);
		this.getInfo();
	},
	methods: {
		async getInfo() {
			const res = await this.$myRequest({
				url: "/user/userMessage/getById",
				data: {
					id: this.messageId,
				},
			});
			// console.log(res);
			if (res.success !== 1) return;
			this.info = res.data;
			// uni.setNavigationBarTitle({
			// 	title: res.data.title,
			// });
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 40rpx;
	font-size: 30rpx;
	color: #333;
	line-height: 50rpx;
	background: #fff;

	.title {
		padding: 50rpx 0;
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
	}

	.info-item {
		margin-bottom: 40rpx;

		text {
			display: inline-block;
			padding-left: 16rpx;
		}
	}
}
</style>
