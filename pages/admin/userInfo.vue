<template>
	<view class="container">
		<view class="header">
			<view class="main" @click="uploadImg">
				<view class="user_image">
					<image
						class="user_image"
						:src="
							!userInfo.avatar
								? '../../static/images/headImg.png'
								: userInfo.avatar
						"
						mode=""
					></image>
				</view>
				<view class="title"> 点击修改头像 </view>
			</view>
		</view>
		<view class="center">
			<view class="main">
				<view
					class="menus"
					:class="{ noBorder: item.type == 2 }"
					v-for="(item, index) in menusList"
					:key="index"
				>
					<view class="label" style="text-align: justify">
						{{ item.label }}
					</view>
					<view
						class="menus_right"
						:class="{
							remind: index == 2 && item.value == '去绑定',
						}"
						@click="setInfo(item)"
					>
						{{ !item.value ? "暂无" : item.value }}
						<image
							class="icon"
							src="../../static/images/arrow_left.png"
							mode=""
						></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			menusList: [
				{ label: "昵称", value: "", type: 0 },
				{ label: "手机号", value: "", type: 1 },
				{ label: "微信", value: "去绑定", type: 2 },
			],
			imgUrl: "",
			userInfo: {},
			editType: null,
		};
	},
	onLoad() {},
	onShow() {
		this.userInfo = uni.getStorageSync("userInfo");
		this.menusList[0].value = this.userInfo.name;
		this.menusList[1].value = this.userInfo.phone;
		this.menusList[2].value = !this.userInfo.nickname
			? "去绑定"
			: this.userInfo.nickname;
	},
	methods: {
		setInfo(param) {
			this.editType = param.type;
			if (param.type === 0) {
				uni.navigateTo({
					url:
						"/pages/admin/infoEditor?label=" +
						param.label +
						"&value=" +
						param.value,
				});
			} else if (param.type === 1) {
				this.$goPage("/pages/admin/inputNewPhone", {
					phone: this.userInfo.phone,
				});
			} else if (param.type === 2) {
				// this.cancelBindingWx();
				param.value === "去绑定"
					? this.goBindingWx()
					: this.cancelBindingWx();
			}
		},
		// 用户信息修改
		userUpdate() {
			uni.showLoading();
			let data = this.userInfo;
			this.$myRequest({
				method: "POST",
				url: "/user/appUser/update",
				data: data,
			}).then((res) => {
				if (res.success == 1) {
					let data = res.data;
					uni.showToast({
						title: "修改成功",
					});
					this.userInfo = data;
					uni.setStorageSync("userInfo", data);
					uni.hideLoading();
				} else {
					uni.showToast({
						title: "修改失败，稍后重试",
					});
				}
			});
		},
		// 上传图片修改头像
		uploadImg() {
			this.requestAndroidPermission(
				"android.permission.READ_EXTERNAL_STORAGE"
			);
			const token = uni.getStorageSync("token");
			this.token = token;
			// #ifdef APP-PLUS
			plus.gallery.pick(
				function (path) {
					uni.showLoading({
						title: "上传中",
					});
					uni.uploadFile({
						url: this.$BASEURL + "/file/uploadImg", //仅为示例，非真实的接口地址
						filePath: path,
						name: "file",
						header: {
							Authorization: token,
						},
						success: (upRes) => {
							const data = JSON.parse(upRes.data);
							this.userInfo.avatar = data.data.url;
							this.userUpdate();
							uni.hideLoading();
						},
					});
				}.bind(this),
				function (e) {
					if (e.message == "No Permission") {
						uni.showToast({
							title: "需要授权相册权限才能修改哦",
							icon: "none",
						});
					}
				},
				{ filter: "image" }
			);
			// #endif
		},
		async requestAndroidPermission(permisionID) {
			var result = await permision.requestAndroidPermission(permisionID);
			if (result == -1) {
				uni.showModal({
					title: "提示",
					content: "您未开启相册访问权限，是否去开启",
					success: function (res) {
						if (res.confirm) {
							permision.gotoAppPermissionSetting();
						} else if (res.cancel) {
							// console.log("用户点击取消");
						}
					},
				});
			}
		},
		goBindingWx() {
			const that = this;
			if (
				!plus.runtime.isApplicationExist({
					pname: "com.tencent.mm",
					action: "weixin://",
				})
			) {
				uni.showToast({
					title: "请先安装微信",
					icon: "none",
				});
				return;
			}
			uni.getProvider({
				service: "oauth",
				success: (res) => {
					//支持微信、qq和微博等
					if (~res.provider.indexOf("weixin")) {
						uni.login({
							provider: "weixin",
							success: (loginRes) => {
								if (loginRes.errMsg !== "login:ok") return;

								// 获取用户信息
								uni.getUserInfo({
									provider: "weixin",
									success: (infoRes) => {
										if (infoRes.errMsg !== "getUserInfo:ok")
											return;
										// #ifdef APP-PLUS
										uni.showLoading({
											title: "加载中",
										});
										// #endif
										const obj = {
											openId: infoRes.userInfo.openId,
											nickname: infoRes.userInfo.nickName,
											avatar: infoRes.userInfo.avatarUrl,
											unionid: infoRes.userInfo.unionId,
										};

										const url =
											"/user/weChatLogin/bindWeChat";
										that.$myRequest({
											url: url,
											data: obj,
										}).then((res) => {
											// console.log("绑定微信", res);

											setTimeout(() => {
												uni.hideLoading();
											}, 1000);

											if (res.success !== 1) {
												uni.showToast({
													title: res.msg,
													icon: "none",
												});
												return;
											}
											uni.showToast({
												title: "绑定成功",
												icon: "none",
												complete: () => {
													let userInfo =
														res.data.user;
													this.menusList[2].value =
														userInfo.nickname;
													uni.setStorageSync(
														"userInfo",
														userInfo
													);
												},
											});
										});
									},
									fail: () => {
										uni.showToast({
											icon: "none",
											title: "授权失败",
										});
									},
								});
							},
							fail: () => {
								uni.showToast({
									icon: "none",
									title: "授权失败",
								});
							},
						});
					}
				},
			});
		},
		async cancelBindingWx() {
			uni.showLoading({ title: "加载中" });
			const res = await this.$myRequest({
				url: "/user/weChatLogin/unboundWeChat",
			});
			uni.hideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			this.menusList[2].value = "去绑定";
			this.$nextTick(() => {
				uni.showToast({
					title: "成功解除微信绑定",
					icon: "none",
				});
			});
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #f7f6f6;
}
.header {
	height: 393rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.user_image {
		height: 152rpx;
		width: 152rpx;
		background-color: #ffffff;
		border-radius: 50%;
		margin: 0 auto;
	}
	.title {
		margin-top: 31rpx;
		font-size: 30rpx;
		color: #666666;
	}
}
.center {
	width: 690rpx;
	// height: 330rpx;
	background-color: #ffffff;
	margin: 0 auto;
	border-radius: 10rpx;
	.main {
		width: 650rpx;
		// background-color: #71D5A1;
		// height: 330rpx;
		margin: 0 auto;
		font-size: 32rpx;
		.label {
			width: 100rpx;
		}
		.menus {
			height: 110rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid #ebebeb;
			.icon {
				width: 35rpx;
				height: 35rpx;
				margin-left: 26rpx;
				position: relative;
				top: 4rpx;
			}
		}
	}
}
.remind {
	color: #ff7247;
}
.noBorder {
	border: none !important;
}
</style>
