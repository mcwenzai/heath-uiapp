<template>
	<view class="container">
		<view class="header">
			<view class="title">
				{{ loginType }}
			</view>
			<view class="sub_title"> 未注册过的手机号将自动创建账户 </view>
		</view>
		<view class="mian">
			<view class="phone_number">
				<text class="label" style="line-height: 70rpx">手机号：</text>
				<input
					@input="inputCheckout"
					class="number"
					maxlength="11"
					type="number"
					@blur="checkout"
					v-model="phoneNumber"
					placeholder-style="font-size:34rpx;margin-top:4rpx"
					placeholder="请输入您的手机号"
				/>
			</view>
			<view class="login_opreate">
				<button
					class="login_btn"
					@click="getCode"
					:style="{ opacity: isArgee && numberVerify ? '1' : '0.6' }"
					type="default"
				>
					下一步
				</button>
				<view class="opreate_footer" v-if="showArgee">
					<view
						class="option_icon"
						:class="{ option_icon1: isArgee }"
						@click="next"
					>
						<image
							style="width: 26rpx; height: 20rpx"
							src="../../static/images/hook.png"
							mode=""
						></image>
					</view>
					<view style="margin-left: 14rpx"
						>我已阅读并同意
						<text style="color: #1870c9" @click="goAgreemrnt(1)"
							>用户协议</text
						>
						和
						<text @click="goAgreemrnt(2)" style="color: #1870c9"
							>隐私政策</text
						></view
					>
				</view>
			</view>
		</view>

		<view class="footer">
			<view class="quick_login">
				<view class="title"> — 快捷登录 — </view>

				<view class="app-f app-f-aic app-f-jcc">
					<image
						@tap="appleLogin"
						src="../../static/images/apple.png"
						v-if="isIOS13"
					></image>
					<view style="width: 100rpx;" v-if="isIOS13 && isWeChat">

					</view>
					<image
						@click="weChartLogin"
						src="../../static/images/weChart_icon.png"
						mode=""
						v-if="isWeChat"
					></image>
				</view>
			</view>
			<view
				@click="skip"
				v-if="!isAndroid"
				class="login_btn skip_btn"
				style="
					text-align: center;
					margin-top: 100rpx;
					color: #666;
					font-size: 32rpx;
				"
			>
				暂不登录
			</view>
		</view>

		<u-mask :show="show" @click="show = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="top"> 感谢您下载禾大夫 </view>
					<view class="center">
						在您使用禾大夫之前，请您务必充分理解“用户协议”、“隐私政策”的各个条款。这个过程中，我们可能收集、使用或共享您的个人信息的清晰，希望您着重关注：
						<br />1.为了完成您订单的支付、配送售后等，我们可能会手机使用您订单中的信息，相关必要信息可能需要共享给平台内店铺、物流等第三方；<br />
						具体内容请您详见<text
							style="color: #1870c9"
							@click="goAgreemrnt(1)"
							>《用户协议》</text
						>、<text style="color: #1870c9" @click="goAgreemrnt(2)"
							>《隐私政策》</text
						>全文。如同意并继续使用本软件，请点击同意；如不同意，点击不同意退出。我们会不断完善技术和安全管理，保护您的信息。
					</view>
					<view class="bottom" style="border-top: 2rpx solid #dcdcdc">
						<view class="left" @click="noAgree"> 不同意 </view>
						<view
							@click="agree"
							class="right"
							style="
								border-left: 2rpx solid #dcdcdc;
								color: #ff7247;
							"
						>
							同意
						</view>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
import setRequestVerification from "@/libs/secretRequest.js";
export default {
	data() {
		return {
			show: false,
			argeeState: 0,
			phoneNumber: "",
			isArgee: false,
			loginType: "登录/注册",
			showArgee: true,
			numberVerify: false,
			deviceInfo: "",
			wxInfo: "",
			isAndroid: false,
			deviceId: "",
			isIOS13: false,
			isWeChat:true
		};
	},
	onLoad() {
		uni.$on(
			"anewVer",
			function (data) {
				this.getVerCode(data.param);
			}.bind(this)
		);
	},
	created() {
		getApp().globalData.customerData = null;
		// 节流函数
		this.getCode = this.fnThrottle(this.getCode, 1000);
		this.argeeState = uni.getStorageSync("argeeState");
		if (this.argeeState == 0) {
			this.show = true;
		}
		uni.getSystemInfo({
			success: function (res) {
				const p = res.platform;
				const sys = Number(res.system.split(" ")[1].split(".")[0]);
				if (p == "android") {
					this.show = false;
					this.isAndroid = true;
				} else if (sys < 13) {
					this.isAndroid = false;
					//不支持苹果登录
				} else if (sys >= 13) {
					//调用苹果登录
					this.isAndroid = false;
					this.isIOS13 = true;
				}
				// 判断是否IOS并且是否安装微信，否则隐藏微信第三方登录
				if(p !== "android" && !plus.runtime.isApplicationExist({
					pname: "com.tencent.mm",
					action: "weixin://",
				})){
					this.isWeChat = false
				}
			}.bind(this),
		});

	},
	methods: {
		// 非正常登录-游客模式
		skip() {
			uni.getSystemInfo({
				success: function (res) {
					this.deviceId = res.deviceId;
				}.bind(this),
			});
			const type = this.getPhoneType();
			let data = {
				deviceId: this.deviceId,
			};
			const url = "/user/appUser/deviceIdLogin";
			this.$myRequest({
				method: "GET",
				url: url,
				data: data,
			})
				.then((res) => {
					// 登录成功缓存本地
					if (res.success == 1) {
						let token = res.data.token;
						let userInfo = res.data.user;
						uni.setStorageSync("token", token);
						uni.setStorageSync("userInfo", userInfo);
						// 根据是否有地址信息跳转页面
						if (!userInfo.cityCode) {
							uni.reLaunch({
								url: "/pages/address/index",
							});
						} else {
							uni.switchTab({
								url: "/pages/index/index",
							});
						}
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
		// 获取平台信息
		getPhoneType() {
			const info = uni.getSystemInfoSync();
			return info.platform;
		},
		inputCheckout(e) {
			const v = e.target.value;
			this.phoneNumber = v;
			this.numberVerify = v.length === 11;
		},
		getCode() {
			if (this.phoneNumber == "") {
				uni.showToast({
					title: "请填写手机号",
					icon: "none",
				});
			} else if (!this.numberVerify) {
				uni.showToast({
					title: "请输入正确的手机号格式",
					icon: "none",
				});
			} else if (!this.isArgee) {
				uni.showToast({
					title: "请先阅读用户协议和隐私政策",
					icon: "none",
				});
			} else if (this.isArgee && this.numberVerify) {
				this.getVerCode(this.phoneNumber);
			}
		},
		getVerCode(param) {
			const data = {
				phone: param,
				type: 0,
			};
			const url =
				"/user/appUser/sendLoginSms" + setRequestVerification(data, 0);
			this.$myRequest({
				method: "GET",
				url: url,
				data: data,
			})
				.then((res) => {
					if (res.success == 1) {
						uni.showToast({
							title: "验证码发送成功",
						});
						// 验证码获取成功跳转页面
						let timer2 = setTimeout(
							function () {
								uni.navigateTo({
									url:
										"/pages/login/verCode?phoneNum=" +
										param +
										"&smsId=" +
										res.data.smsId,
								});
							}.bind(this),
							1000
						);
					} else if (res.success == 0) {
						// 验证码不成功提示
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {
					uni.showToast({
						icon: "none",
						title: "网络连接失败，请稍后再试",
						duration: 2000,
					});
				});
		},
		// 微信第三方登录
		weChartLogin() {
			if (!this.isArgee) {
				uni.showToast({
					title: "请先阅读用户协议和隐私政策",
					icon: "none",
				});
				return;
			}
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
			const that = this;
			uni.getProvider({
				service: "oauth",
				success: function (res) {
					//支持微信、qq和微博等
					if (~res.provider.indexOf("weixin")) {
						uni.login({
							provider: "weixin",
							success: function (loginRes) {
								if (loginRes.errMsg !== "login:ok") return;
								// 获取用户信息
								uni.getUserInfo({
									provider: "weixin",
									success: function (infoRes) {
										if (infoRes.errMsg !== "getUserInfo:ok")
											return;
										// #ifdef APP-PLUS

										const info = plus.push.getClientInfo();
										// #endif
										const obj = {
											pushJson: info,
											openId: infoRes.userInfo.openId,
											nickname: infoRes.userInfo.nickName,
											avatar: infoRes.userInfo.avatarUrl,
											unionid: infoRes.userInfo.unionId,
										};

										uni.showLoading({
											title: "加载中",
										});

										const url =
											"/user/weChatLogin/login" +
											setRequestVerification(
												{
													...obj,
													pushJson: JSON.stringify(
														obj.pushJson
													),
												},
												2
											);
										that.$myRequest({
											url: url,
											data: obj,
										})
											.then((res) => {
												uni.hideLoading();
												if (res.success !== 1) {
													uni.showToast({
														title: res.msg,
														icon: "none",
													});
													return;
												}
												let token = res.data.token;
												let userInfo = res.data.user;
												uni.setStorageSync(
													"token",
													token
												);
												uni.setStorageSync(
													"userInfo",
													userInfo
												);
												//根据是否有地址信息跳转页面
												if (!userInfo.phone) {
													uni.navigateTo({
														url: "/pages/login/bindPhone",
													});
												} else if (userInfo.salesman) {
													uni.reLaunch({
														url: "/pages/salesman/index",
													});
												} else {
													if (
														res.data
															.syncCymQualification
													) {
														let syncSkipData =
															uni.getStorageSync(
																"syncSkipData"
															);
														if (
															!syncSkipData ||
															syncSkipData.length ==
																0
														) {
															uni.navigateTo({
																url: "/pages/login/isSync",
															});
														} else {
															for (let i in syncSkipData) {
																if (
																	syncSkipData[
																		i
																	] ==
																	userInfo.phone
																) {
																	uni.switchTab(
																		{
																			url: "/pages/index/index",
																		}
																	);
																	return false;
																} else if (
																	i ==
																	syncSkipData.length -
																		1
																) {
																	uni.navigateTo(
																		{
																			url: "/pages/login/isSync",
																		}
																	);
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
											})
											.catch((err) => {
												uni.showToast({
													icon: "none",
													title: "网络连接失败，请稍后再试",
													duration: 2000,
												});
											});
									},
									fail: (err) => {
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
		// 用户协议和隐私协议
		goAgreemrnt(param) {
			uni.navigateTo({
				url: "/pages/login/userAgreement?type=" + param,
			});
		},
		next() {
			this.isArgee = !this.isArgee;
		},
		checkout(e) {
			let myreg =
				/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(19[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if (myreg.test(this.phoneNumber)) {
				this.numberVerify = true;
			} else if (this.phoneNumber == "") {
				uni.showToast({
					title: "请输入手机号",
					icon: "none",
				});
				this.numberVerify = false;
			} else {
				uni.showToast({
					title: "请输入正确的手机号格式",
					icon: "none",
				});
				this.numberVerify = false;
			}
		},
		agree() {
			this.show = false;
			this.argeeState = 1;
			uni.setStorageSync("argeeState", this.argeeState);
		},
		noAgree() {
			this.show = false;
			// 关闭应用
			if (uni.getSystemInfoSync().platform == "ios") {
				plus.ios
					.import("UIApplication")
					.sharedApplication()
					.performSelector("exit");
			} else if (uni.getSystemInfoSync().platform == "android") {
				plus.runtime.quit();
			}
		},
		appleLogin() {
			if (!this.isArgee) {
				uni.showToast({
					title: "请先阅读用户协议和隐私政策",
					icon: "none",
				});
				return;
			}
			uni.login({
				provider: "apple",
				success: (loginRes) => {
					if (loginRes.errMsg === "login:ok") {
						uni.getUserInfo({
							provider: "apple",
							success: (userInfoRes) => {
								// 获取 identityToken
								if (userInfoRes.errMsg === "getUserInfo:ok") {
									const openId = userInfoRes.userInfo.openId;
									if (openId) {
										// #ifdef APP-PLUS

										const info = plus.push.getClientInfo();
										// #endif
										const obj = {
											openId: openId,
											pushJson: info,
										};
										const url =
											"/user/appleLogin/login" +
											setRequestVerification(
												{
													...obj,
													pushJson: JSON.stringify(
														obj.pushJson
													),
												},
												3
											);
										uni.showLoading({
											title: "加载中",
										});
										this.$myRequest({
											url,
											data: obj,
										}).then((res) => {
											uni.hideLoading();
											if (res.success !== 1) {
												uni.showToast({
													title: res.msg,
													icon: "none",
												});
												return;
											}

											let token = res.data.token;
											let userInfo = res.data.user;
											uni.setStorageSync("token", token);
											uni.setStorageSync(
												"userInfo",
												userInfo
											);
											// 根据是否有地址信息跳转页面
											if (!userInfo.phone) {
												uni.navigateTo({
													url: "/pages/login/bindPhone?type=isAppleLogin",
												});
											} else if (userInfo.salesman) {
												uni.reLaunch({
													url: "/pages/salesman/index",
												});
											} else {
												if (
													res.data
														.syncCymQualification
												) {
													let syncSkipData =
														uni.getStorageSync(
															"syncSkipData"
														);
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
																syncSkipData[
																	i
																] ==
																userInfo.phone
															) {
																uni.switchTab({
																	url: "/pages/index/index",
																});
																return false;
															} else if (
																i ==
																syncSkipData.length -
																	1
															) {
																uni.navigateTo({
																	url: "/pages/login/isSync",
																});
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
										});
									}
								}
							},
							fail: (err) => {
								uni.showToast({
									icon: "none",
									title: "授权失败",
								});
							},
						});
					}
				},
				fail: (err) => {
					uni.showToast({
						icon: "none",
						title: "授权失败",
					});
				},
			});
		},
		fnThrottle(fn, delay, atleast) {
			//节流函数
			let timer = null;
			let previous = null;
			return function () {
				uni.showLoading();
				let now = +new Date();
				if (!previous) previous = now;
				if (atleast && now - previous > atleast) {
					fn();
					previous = now;
					uni.hideLoading();
					clearTimeout(timer);
				} else {
					clearTimeout(timer);
					timer = setTimeout(() => {
						fn();
						previous = null;
						uni.hideLoading();
					}, delay);
				}
			};
		},
	},
};
</script>

<style lang="scss">
.warp {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}
.rect {
	width: 560rpx;
	height: 760rpx;
	background-color: #fff;
	border-radius: 20rpx;
	box-shadow: -15rpx 0rpx 0rpx NaNpx rgba(160, 160, 160, 0.24);
	.top {
		height: 117rpx;
		font-size: 34rpx;
		color: #333333;
		font-weight: 700;
		text-align: center;
		line-height: 117rpx;
	}
	.center {
		width: 476rpx;
		margin: 0 auto;
		font-size: 28rpx;
		line-height: 36rpx;
	}
	.bottom {
		display: flex;
		margin-top: 38rpx;
		view {
			width: 50%;
			height: 100rpx;
			font-size: 34rpx;
			font-weight: 700;
			text-align: center;
			line-height: 100rpx;
			color: #999999;
		}
	}
}
.container {
	width: 640rpx;
	margin: 0 auto;
}
.header {
	height: 335rpx;
	margin-top: 168rpx;
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
		height: 97rpx;
		display: flex;
		border-bottom: 2rpx solid #ebebeb;
		.label {
			font-size: 34rpx;
			text-align: left;
			color: #333333;
			white-space: nowrap;
		}
		.number {
			font-size: 44rpx;
		}
	}
	.login_opreate {
		.login_btn {
			width: 640rpx;
			height: 100rpx;
			opacity: 0.6;
			background: #ff7247;
			border-radius: 50rpx;
			margin-top: 83rpx;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: 600;
			line-height: 100rpx;
		}
		.skip_btn {
			text-align: center;
			height: 80rpx;
			font-weight: 400;
			margin-top: 300rpx;
			background: #f7fafc;
			font-size: 30rpx;
			color: #666666;
		}
		.opreate_footer {
			display: flex;
			margin-top: 50rpx;
			margin-left: 20rpx;
			font-size: 30rpx;
			.option_icon,
			.option_icon1 {
				width: 40rpx;
				height: 40rpx;
				border: 2rpx solid #aaaaaa;
				border-radius: 50%;
			}
			.option_icon {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.option_icon1 {
				background-color: #ff7247;
				border: none;
			}
		}
	}
}
.footer {
	margin-top: 259rpx;
	height: 200rpx;

	.quick_login {
		height: 187rpx;

		font-size: 30rpx;
		text-align: center;
		image {
			margin-top: 38rpx;
			width: 110rpx;
			height: 110rpx;
		}
	}
}
</style>
