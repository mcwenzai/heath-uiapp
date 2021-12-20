<template>
	<view>
		<template v-if="info.type === 2">
			<image class="invoice-img" :src="info.url" mode="aspectFit"></image>
			<view class="btn" @tap="saveImg">保存图片</view>
		</template>
		<template v-if="info.type === 1">
			<web-view :src="info.url"></web-view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			info: {},
		};
	},
	onLoad() {
		const info = uni.getStorageSync("orderInvoiceInfo") || {};
		this.info = info;
	},
	methods: {
		saveImg() {
			uni.showLoading({
				title: "保存中...",
				icon: "none",
			});
			uni.downloadFile({
				url: this.info.url, //仅为示例，并非真实的资源
				success: (res) => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									icon: "none",
									title: "保存成功",
								});
							},
							fail: () => {
								uni.showToast({
									icon: "none",
									title: "保存失败",
								});
							},
						});
					} else {
						uni.showToast({
							icon: "none",
							title: "保存失败",
						});
					}
				},
				fail: () => {
					uni.showToast({
						icon: "none",
						title: "保存失败",
					});
				},
			});
		},
	},
};
</script>

<style scoped lang="scss">
.invoice-img {
	width: 750rpx;
}
.btn {
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	height: 80rpx;
	width: 670rpx;
	bottom: 25rpx;
	background: #ff7247;
	border-radius: 40rpx;
	font-size: 30rpx;
	color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
