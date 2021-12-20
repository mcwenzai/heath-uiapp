<template>
	<view class="container" style="overflow: hidden">
		<view class="header">
			<view class="title"> 绑定手机号 </view>
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
					:style="{ opacity: numberVerify ? '1' : '0.6' }"
					type="default"
				>
					下一步
				</button>
			</view>
		</view>
		<view class="footer" @click="showModel2 = true" v-if="isShowQuitBtn">
			退出登录
		</view>
		<u-modal
			title="提 示"
			@confirm="loginOut()"
			@cancel="showModel2 = false"
			:cancel-style="cancelStyle"
			negative-top="160"
			v-model="showModel2"
			:confirm-style="confirmStyle"
			:content-style="contentStyle"
			:title-style="titleStyle"
			:mask-close-able="true"
			:show-cancel-button="true"
			confirm-color="#FF7247"
			cancel-color="#999999"
			content="是否确定退出登录？"
		></u-modal>
	</view>
</template>

<script>
import setRequestVerification from "@/libs/secretRequest.js";
import { fnThrottle } from "@/libs/tool";
export default {
	data() {
		return {
			phoneNumber: "",
			showModel2: false, //退出登录模态框
			numberVerify: false,
			isShowQuitBtn: false,
			titleStyle: {
				fontWeight: 600,
				fontSize: "40rpx",
			},
			contentStyle: {
				fontSize: "32rpx",
				marginTop: "20rpx",
				marginBottom: "80rpx",
			},
			confirmStyle: {
				borderLeft: "2rpx solid #DCDCDC",
				fontWeight: 600,
				fontSize: "34rpx",
			},
			cancelStyle: {
				borderLeft: "2rpx solid #DCDCDC",
				fontWeight: 600,
				fontSize: "34rpx",
			},
			// isAppleLogin apple登录，空是微信登录
			loginType: "",
		};
	},
	onLoad(options) {
		this.loginType = options.type || "";
		try {
			var pages = getCurrentPages();
			var page = pages[pages.length - 2].route;
			if (page === "pages/index/index") {
				this.isShowQuitBtn = true;
			}
		} catch (error) {}
	},
	created() {},
	methods: {
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
			} else if (this.numberVerify) {
				this.getVerCode(this.phoneNumber);
			}
		},
		getVerCode(param) {
			const data = {
				phone: param,
				type: 0,
			};
			const obj = {
				isAppleLogin: "/user/appleLogin/sendAppleBindPhoneSms",
			};
			let url = "/user/appUser/sendBindPhoneSms";
			if (this.loginType) {
				url = obj[this.loginType];
			}
			this.$myRequest({
				method: "GET",
				url: url,
				data: data,
			})
				.then((res) => {
					if (res.success == 1) {
						uni.showToast({
							title: "验证码发送成功",
							success: () => {
								setTimeout(() => {
									uni.navigateTo({
										url:
											"/pages/login/bindPhoneCode?phoneNum=" +
											param +
											"&smsId=" +
											res.data.smsId +
											"&type=" +
											this.loginType,
									});
								}, 2000);
							},
						});
						// 验证码获取成功跳转页面
					} else if (res.success == 0) {
						// 验证码不成功提示
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
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
		// 退出登录
		async loginOut() {
			// 改为try_catch
			try {
				getApp().globalData.customerData = null;
				uni.clearStorageSync();
			} catch (e) {
				uni.showToast({
					title: "退出失败",
					icon: "error",
				});
				return false;
			}

			const res = await this.$myRequest({
				url: "/user/appUser/logout",
			});
			if (res.success !== 1)
				return uni.showToast({
					title: res.msg,
					icon: "none",
				});
			uni.getSystemInfo({
				success: function (res) {
					let appType = res.platform;
					if (appType == "android") {
						// console.log("安卓");
					} else {
						uni.setStorageSync("argeeState", 1);
					}
				}.bind(this),
			});
			uni.reLaunch({
				url: "/pages/login/login",
			});
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
	font-size: 34rpx;
	color: #ff7247;
	position: absolute;
	left: 50%;
	bottom: 81rpx;
	transform: translateX(-50%);
}
</style>
