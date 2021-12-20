<template>
	<view class="container">
		<view class="header">
			<view class="title"> 输入4位验证码 </view>
			<view class="sub_title">
				验证码已发送到您的手机号
				<view style="margin-top: 20rpx">
					{{ phoneNum }}
				</view>
			</view>
		</view>
		<view class="mian">
			<view class="phone_number">
				<text class="label" style="line-height: 70rpx">验证码：</text>
				<u-message-input
					style="margin-top: -20rpx"
					active-color="#FF7247"
					mode="bottomLine"
					v-model="verCode"
					@finish="finish"
				></u-message-input>
			</view>
			<view class="login_opreate">
				<button class="login_btn" @click="getCode2()" type="default">
					{{ text }}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
import setRequestVerification from "@/libs/secretRequest.js";
export default {
	data() {
		return {
			verCode: "",
			phoneNum: "",
			timeClose: "",
			timer: null,
			text: "获取验证码",
			status: false,
			num: 60,
			smsId: "",
			deviceInfo: {},
			// isAppleLogin apple登录，空是微信登录
			loginType: "",
		};
	},
	onLoad: function (data) {
		// 获取到前一个页面的参数
		this.phoneNum = data.phoneNum;
		this.smsId = data.smsId;
		this.loginType = data.type || "";
		// 调用倒计时
		this.getCode();
		// #ifdef APP-PLUS
		const info = plus.push.getClientInfo();
		this.deviceInfo = info;
		// #endif
	},
	methods: {
		// 倒计时开始接口
		getCode() {
			this.status = true;
			this.loading();
			this.timer = setInterval(() => {
				if (this.num === 0) {
					this.timer && this.clearTimer();
					this.reset();
				} else {
					this.loading();
				}
			}, 1000);
		},
		// 重新获取点击
		getCode2() {
			if (this.status == false) {
				const data = {
					phone: this.phoneNum,
					type: 0,
				};

				const obj = {
					isAppleLogin: "/user/appleLogin/sendAppleBindPhoneSms",
				};
				let str = "/user/appUser/sendBindPhoneSms";
				if (this.loginType) {
					str = obj[this.loginType];
				}
				const url = `${str}${setRequestVerification(data, 0)}`;
				this.$myRequest({
					method: "GET",
					url: url,
					data: data,
				})
					.then((res) => {
						if (res.success == 1) {
							uni.showToast({
								title: "验证码获取成功",
							});
							this.smsId = res.data.smsId;
							this.getCode();
						} else if (res.success == 0) {
							// 验证码不成功提示
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
						}
					})
					.catch((err) => {});
			}
		},
		reset() {
			this.num = 60;
			this.status = false;
			this.text = "重新获取";
		},
		loading() {
			this.num -= 1;
			this.text = this.num + "s";
		},
		clearTimer() {
			clearInterval(this.timer);
			this.timer = null;
		},
		// 验证码填写完成
		finish(e) {
			// 自动执行登录
			this.login(e);
		},
		// 登录接口
		login(param) {
			const data = {
				code: param,
				phone: this.phoneNum,
				smsId: this.smsId,
			};
			const obj = {
				isAppleLogin: "/user/appleLogin/appleBindPhone",
			};
			let str = "/user/weChatLogin/bindPhone";
			if (this.loginType) {
				str = obj[this.loginType];
			}
			this.$myRequest({
				method: "GET",
				url: str,
				data: data,
			})
				.then((res) => {
					// 登录成功缓存本地
					if (res.success == 1) {
						// 清除倒计时
						this.timer && this.clearTimer();
						this.reset();
						let userInfo = res.data.user;
						if (res.data.token) {
							uni.setStorageSync("token", res.data.token);
						}
						uni.setStorageSync("userInfo", userInfo);
						uni.showToast({
							title: "绑定成功！",
						});
						// 根据是否有地址信息跳转页面
						let timer3 = setTimeout(
							function () {
								if (userInfo.isSalesman) {
									uni.setStorageSync(
										"isSalesman",
										userInfo.isSalesman
									);
									uni.reLaunch({
										url: "/pages/salesman/index",
									});
								} else {
									if (res.data.syncCymQualification) {
										let syncSkipData =
											uni.getStorageSync("syncSkipData");
										if (
											!syncSkipData ||
											syncSkipData.length == 0
										) {
											uni.navigateTo({
												url: "/pages/login/isSync",
											});
										} else {
											for (let i in syncSkipData) {
												if (
													syncSkipData[i] ==
													userInfo.phone
												) {
													uni.switchTab({
														url: "/pages/index/index",
													});
													return false;
												} else {
													uni.reLaunch({
														url: "/pages/login/isSync",
													});
													return false;
												}
											}
										}
									} else {
										if (!userInfo.cityCode)
											uni.reLaunch({
												url: "/pages/address/index",
											});
										else
											uni.switchTab({
												url: "/pages/index/index",
											});
									}
								}
							}.bind(this),
							2000
						);
						//接口容错处理
					} else {
						// 登录失败自动返回
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {
					// console.log(err);
				});
		},
		getPhoneType() {
			const info = uni.getSystemInfoSync();
			return info.platform;
		},
	},
};
</script>

<style lang="scss">
.container {
	width: 640rpx;
	margin: 0 auto;
}

.header {
	height: 335rpx;

	.title {
		font-size: 54rpx;
		font-weight: 700;
		text-align: left;
		color: #222222;
		padding-top: 71rpx;
	}

	.sub_title {
		font-size: 30rpx;
		text-align: left;
		color: #666666;
		padding-top: 31rpx;
	}
}

.mian {
	height: 335rpx;

	.phone_number {
		width: 600rpx;
		height: 97rpx;
		display: flex;

		.label {
			font-size: 34rpx;
			text-align: left;
			color: #333333;
		}
	}

	.login_opreate {
		.login_btn {
			width: 640rpx;
			height: 100rpx;
			background: #ff7247;
			border-radius: 50rpx;
			margin-top: 83rpx;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: 600;
			line-height: 100rpx;
		}
	}
}
</style>
