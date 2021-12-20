<template>
	<view class="container">
		<view class="remind" v-if="denyResult">
			<view style="text-align: center">{{ denyResult }}</view>
		</view>
		<view class="header">
			<view class="main"  @click="previewPhoto">
				<image
					class="main"
					style="border: none"
					src="https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/100027019b19bd7bb-21d0-43b9-bc37-d60d40132a7f.jpg"
					mode=""
				></image>
				<view class="tag">
					示例图
				</view>
				<view class="big">
					<view class="big_icon">
						<image class="big_icon" src="/static/images/big.png" mode=""></image>
					</view>
					<view class="title">
						点击可放大
					</view>
				</view>
			</view>
		</view>
		<view
			class="center"
			:style="{
				justifyContent: imgArr.length == 0 ? 'center' : 'space-between',
			}"
		>
			<template v-if="imgArr.length !== 0">
				<view
					class="photo"
					v-for="(item, index) in imgArr"
					:key="index"
				>
					<image class="image" :src="item" mode=""></image>
					<image
						class="dete_icon"
						@click="deleteImg(index)"
						src="../../static/images/delete_icon.png"
						mode=""
					></image>
				</view>
			</template>

			<view class="upload" v-if="imgArr.length < 2" @click="uploadImg">
				<view class="icon">
					<image
						style="width: 82rpx; height: 66rpx; margin-left: 18rpx"
						src="../../static/images/camera_icon.png"
						mode=""
					></image>
					<text
						style="
							display: inline-block;
							width: 120rpx;
							height: 66rpx;
						"
						>上传图片</text
					>
				</view>
			</view>
		</view>
		<view
			class="footer"
			:style="{ opacity: imgArr.length < 1 ? '0.8' : '1' }"
			@click="upLoad"
		>
			上传
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			quaInfo: {},
			denyResult: null,
			imgArr: [],
		};
	},
	onLoad() {
		this.quaInfo = uni.getStorageSync("quaInfo");
		if (this.quaInfo.buyerCardStatus === 2) {
			this.quaInfo.buyerCardCause
				? (this.denyResult = this.quaInfo.buyerCardCause)
				: (this.denyResult = this.quaInfo.buyerCardNote);
		} else if (this.quaInfo.buyerCardStatus === 3) {
			this.denyResult = "证件有效期的剩余时间不足30天，请及时更新";
		} else if (this.quaInfo.buyerCardStatus === 4) {
			this.denyResult = "您的证件已过期，请及时更新";
		}

		this.imgArr = this.quaInfo.buyerCard.split(",");
	},
	methods: {
		previewPhoto(){
			uni.navigateTo({
				url: "/userPages/certification/previewPhoto?param=1",
			});
		},
		// 上传图片修改头像
		uploadImg() {
			const token = uni.getStorageSync("token");
			this.token = token;
			uni.chooseImage({
				count: 1,
				sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
				sourceType:['camera',"album"], //从相册选择
				success: (res) => {
					const paths = res.tempFilePaths;
					let resSize = res.tempFiles[0].size;
					if(resSize > 10485760){
						uni.showToast({
							title: "图片限制最大10M",
							icon: 'none',
							duration: 2000,
							mask: true
						});
					return
					}
					uni.showLoading({
						mask: true,
						title: "上传中",
					});
					uni.uploadFile({
						url: this.$BASEURL + "/file/uploadImg", //仅为示例，非真实的接口地址
						filePath: paths[0],
						name: "file",
						header: {
							Authorization: token,
						},
						success: (upRes) => {
							const data = JSON.parse(upRes.data);
							this.imgArr.push(data.data.url);
							uni.hideLoading();
						},
					});
				},
			});
		},
		upLoad() {
			if (this.imgArr.length < 1)
				return uni.showToast({ title: "请先上传证件", icon: "none" });
			this.quaInfo.buyerCard = this.imgArr[0];
			this.imgArr.length == 2
				? (this.quaInfo.buyerCard =
						this.imgArr[1] + "," + this.imgArr[0])
				: "";
			this.quaInfo.buyerCardStatus = null;
			this.quaInfo.checkStatus = null;
			this.quaInfo.buyerCardCause = null; //拒绝原因置空
			uni.setStorageSync("quaInfo", this.quaInfo);
			uni.showToast({
				title: "上传成功",
			});
			let timer = setTimeout(
				function () {
					uni.redirectTo({
						url: "/userPages/certification/photoUpload",
					});
				}.bind(this),
				1000
			);
		},
		deleteImg(param) {
			this.imgArr.splice(param, 1);
		},
	},
};
</script>

<style lang="scss">
page {
	overflow-y: hidden;
}
.header {
	padding-top: 50rpx;
	.main {
		width: 490rpx;
		height: 540rpx;
		background: #d1d1d1;
		border: 1rpx solid #aaaaaa;
		border-radius: 10rpx;
		margin: 0 auto;
		position: relative;
		.tag {
			height: 50rpx;
			opacity: 0.6;
			background: #333333;
			border-radius: 25rpx;
			font-size: 24rpx;
			color: #ffffff;
			line-height: 50rpx;
			text-align: center;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			padding: 0 18rpx;
		}
	}
}
.center {
	display: flex;
	width: 595rpx;
	margin: 0 auto;
	justify-content: space-between;
	flex-wrap: wrap;
	view {
		width: 280rpx;
		height: 310rpx;
		border: 1rpx solid #d3d3d3;
		border-radius: 10rpx;
		margin-top: 34rpx;
	}
	.photo {
		background: #d1d1d1;
		border-radius: 10rpx;
		position: relative;
		.dete_icon {
			width: 48rpx;
			height: 48rpx;
			position: absolute;
			left: 90%;
			top: -7%;
		}
		image {
			width: 280rpx;
			height: 310rpx;
		}
	}
	.upload {
		position: relative;
		.icon {
			height: 118rpx;
			width: 120rpx;
			margin: 89rpx auto;
			border: none;
			font-size: 30rpx;
		}
	}
}
.footer {
	width: 650rpx;
	height: 100rpx;
	background: #ff7247;
	border-radius: 50rpx;
	box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(255, 133, 97, 0.24);
	margin: 0 auto;
	margin-top: 95rpx;
	font-size: 34rpx;
	font-weight: 700;
	text-align: center;
	color: #ffffff;
	line-height: 100rpx;
	letter-spacing: 4rpx;
}
.remind {
	position: absolute;
	width: 750rpx;
	height: 120rpx;
	opacity: 0.8;
	background-color: #ff7247;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	view {
		width: 670rpx;
		display: inline-block;
		color: #ffffff;
	}
}
.big{
	width: 180rpx;
	height: 40rpx;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	margin-top: 60rpx;
	display: flex;
	color: #545659;
	.big_icon{
		width: 40rpx;
		height: 40rpx;
	}
}
</style>
