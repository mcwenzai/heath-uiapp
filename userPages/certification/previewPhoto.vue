<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<movable-area scale-area>
				<movable-view
					@dblclick="dblclick"
					direction="all"
					@scale="onScale"
					scale="true"
					scale-min="1"
					scale-max="4"
					:scale-value="scale"
				>
					<image :src="imgUrl" mode="widthFix"></image>
				</movable-view>
			</movable-area>
		</view>
		<view class="save-btn" @click="savePhoto"> 保存 </view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			scale: 1,
			imgUrl: "https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/0920386857a6c8696-6c5c-4061-9fa6-f45e811c506a.jpg",
		};
	},
	onLoad(data) {
		if (data.param == 0) {
			this.imgUrl =
				"https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/0920386857a6c8696-6c5c-4061-9fa6-f45e811c506a.jpg";
		} else if (data.param == 2) {
			this.imgUrl =
				"https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/094106457c6157009-3560-420e-9e96-4f07f160bbb0.jpg";
		} else if (data.param == 1) {
			this.imgUrl =
				"https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/100027019b19bd7bb-21d0-43b9-bc37-d60d40132a7f.jpg";
		}
	},
	methods: {
		onScale() {},
		dblclick() {
			if (this.scale == 10) {
				this.scale = 1;
			} else {
				this.scale = 10;
			}
		},
		savePhoto() {
			uni.downloadFile({
				url: this.imgUrl, //图片地址
				success: (res) => {
					// console.log(res);
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success: function () {
							uni.showToast({
								title: "保存成功",
							});
						},
					});
				},
			});
		},
	},
};
</script>

<style lang="scss">
movable-view {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

movable-area {
	height: 80%;
	width: 100%;
	position: fixed;
	overflow: hidden;
}

movable-view image {
	width: 100%;
}

.save-btn {
	width: 480rpx;
	height: 80rpx;
	border-radius: 40rpx;
	color: #ffffff;
	text-align: center;
	line-height: 80rpx;
	font-size: 34rpx;
	font-weight: 600;
	letter-spacing: 6rpx;
	background-color: #ff7247;
	box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(255, 133, 97, 0.24);
	position: absolute;
	left: 50%;
	top: 85%;
	transform: translateX(-50%);
}
</style>
