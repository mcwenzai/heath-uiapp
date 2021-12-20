<template>
	<view class="container">
		<view class="remind" v-if="denyResult">
			<view style="text-align: center">{{ denyResult }}</view>
		</view>
		<view class="content">
			<view class="top" @click="previewPhoto">
				<view class="main">
					<image
						class="main"
						:src="
							id == 0
								? 'https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/0920386857a6c8696-6c5c-4061-9fa6-f45e811c506a.jpg'
								: 'https://tcmai-file.oss-cn-shenzhen.aliyuncs.com/2021/9/1/094106457c6157009-3560-420e-9e96-4f07f160bbb0.jpg'
						"
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
			<view class="center" @click="uploadImg">
				<view class="main">
					<image
						style="width: 600rpx; height: 400rpx"
						:src="imgUrl"
						mode="scaleToFill"
						v-if="imgUrl"
					></image>
					<view class="icon" v-if="!imgUrl">
						<image
							style="
								width: 82rpx;
								height: 66rpx;
								margin-left: 18rpx;
							"
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
				:style="{ opacity: !imgUrl ? '0.8' : '1' }"
				@click="upLoad"
			>
				上传
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			quaInfo: {},
			id: "",
			imgUrl: "",
			denyResult: "",
		};
	},
	onLoad(data) {
		uni.setNavigationBarTitle({
			title: data.title,
		});
		this.quaInfo = uni.getStorageSync("quaInfo");
		this.id = data.id;
		if (this.id == 0) {
			this.quaInfo.medicalPermit !== null
				? (this.imgUrl = this.quaInfo.medicalPermit)
				: "";

			if (this.quaInfo.medicalPermitStatus === 2) {
				!this.quaInfo.medicalPermitCause
					? (this.denyResult = this.quaInfo.medicalPermitNote)
					: (this.denyResult = this.quaInfo.medicalPermitCause);
			} else if (this.quaInfo.medicalPermitStatus === 3) {
				this.denyResult = "证件有效期的剩余时间不足30天，请及时更新";
			} else if (this.quaInfo.medicalPermitStatus === 4) {
				this.denyResult = "您的证件已过期，请及时更新";
			}
		} else if (this.id == 2) {
			this.quaInfo.buyerEntrust !== null
				? (this.imgUrl = this.quaInfo.buyerEntrust)
				: "";
			if (this.quaInfo.buyerEntrustStatus === 2) {
				!this.quaInfo.buyerEntrustCause
					? (this.denyResult =this.quaInfo.buyerEntrustNote)
					: (this.denyResult = this.quaInfo.buyerEntrustCause);
			} else if (this.quaInfo.buyerEntrustStatus === 3) {
				this.denyResult = "证件有效期的剩余时间不足30天，请及时更新";
			} else if (this.quaInfo.buyerEntrustStatus === 4) {
				this.denyResult = "您的证件已过期，请及时更新";
			}
		}
	},
	methods: {
		...mapMutations({
			setCertificationInfo: "certification/setInfo",
		}),
		previewPhoto(){
			uni.navigateTo({
				url: "/userPages/certification/previewPhoto?param="+this.id,
			});
		},
		// 上传图片修改头像
		uploadImg() {
			const token = uni.getStorageSync("token");
			this.token = token;
			uni.chooseImage({
				count: 1,
				sizeType: ["compressed"], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['camera',"album"], //从相册选择
				success: (res) => {
					uni.showLoading({
						mask: true,
					});
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
					uni.uploadFile({
						url: this.$BASEURL + "/file/uploadImg",
						filePath: paths[0],
						name: "file",
						header: {
							Authorization: token,
						},
						success: (upRes) => {
							const data = JSON.parse(upRes.data);
							this.imgUrl = data.data.url;
							uni.hideLoading();
						},
						fail: (error) => {
							uni.hideLoading();
						},
					});
				},
			});
		},
		upLoad() {
			this.quaInfo.userId = uni.getStorageSync("userInfo").id;
			this.quaInfo.checkStatus = null;
			if (this.id == 0) {
				this.quaInfo.medicalPermit = this.imgUrl;
				this.quaInfo.medicalPermitStatus = null;
				this.quaInfo.medicalPermitCause = null; //拒绝原因置空
			} else if (this.id == 2) {
				this.quaInfo.buyerEntrust = this.imgUrl;
				this.quaInfo.buyerEntrustStatus = null;
				this.quaInfo.buyerEntrustCause = null; //拒绝原因置空
			}
			if (!this.imgUrl)
				return uni.showToast({ title: "请先上传证件", icon: "none" });
			this.setCertificationInfo(this.quaInfo);
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
	},
};
</script>

<style lang="scss">
page {
	overflow-y: hidden;
}
.top {
	padding-top: 50rpx;
	.main {
		width: 600rpx;
		height: 400rpx;
		background-color: #82848a;
		margin: 0 auto;
		position: relative;
		background-size: 100% 100%;
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
	margin-top: 74rpx;
	.main {
		width: 600rpx;
		height: 400rpx;
		border: 2rpx solid #bbbbbb;
		border-radius: 8rpx;
		margin: 0 auto;
		.icon {
			height: 118rpx;
			width: 120rpx;
			margin: 138rpx auto;
			border: none;
			font-size: 30rpx;
		}
	}
}
.footer {
	width: 651rpx;
	height: 100rpx;
	opacity: 0.6;
	background: #ff7247;
	border-radius: 50rpx;
	position: absolute;
	left: 50%;
	bottom: 46rpx;
	transform: translateX(-50%);
	font-size: 34rpx;
	font-family: PingFang SC, PingFang SC-Bold;
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
