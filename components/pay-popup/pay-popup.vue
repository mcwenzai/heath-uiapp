<template>
	<view>
		<uni-popup ref="payList" type="bottom" @maskClick="closePayModel">
			<view class="pay-list">
				<view class="header flex-end-center">
					<view class="close-wrap" @click="closePayModel">
						<image
							src="/static/images/cart/close.png"
							class="close-icon"
							mode="aspectFit"
						></image>
					</view>
				</view>
				<view
					class="pay-item flex-start-center"
					v-for="(pay, index) in payList"
					:key="index"
					@click="handleChangePay(index)"
				>
					<image
						class="circle-icon"
						:src="
							payIdx === index
								? '/static/images/cart/circle-active.png'
								: '/static/images/cart/circle.png'
						"
					>
					</image>
					<image :src="pay.icon" mode="aspectFit"></image>
					<text>{{ pay.label }}</text>
				</view>
				<view class="pay-btn flex-center-center" @click="handleDetail"
					>{{ payList[payIdx].label }} ¥{{
						totalMoney | formatePrice
					}}
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import formatePrice from "@/mixins/formatePrice";
export default {
	mixins: [formatePrice],
	props: {
		orderId: {
			default: "",
			type: String,
		},
		showPopup: {
			default: false,
			type: Boolean,
		},
		totalMoney: {
			default: 0,
			type: Number,
		},
	},
	watch: {
		showPopup(v) {
			if (v) {
				this.$refs.payList.open();
			} else {
				this.$refs.payList.close();
			}
		},
	},
	data() {
		return {
			payIdx: 0,
			payList: [
				{
					icon: "/static/images/cart/wx.png",
					label: "微信支付",
					type: 0,
				},
			],
		};
	},
	methods: {
		closePayModel() {
			this.$emit("closePayPopup");
			this.$refs.payList.close();
		},
		handleChangePay(index) {
			this.payIdx = index;
		},

		handleDetail() {
			uni.showLoading()
			let customerId = uni.getStorageSync("customerId");
				let payUrl = `/pay/wxPay/wxPay?orderId=${this.orderId}`
				this.$myRequest({
					method: "GET",
					url: payUrl,
				})
					.then((res) => {
						uni.$emit("cartUpdate", {});
						if (res.success === 1) {
							let payInfo = res.data.packageInfo
							let orderInfo = {
									"appid": payInfo.appid,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
									"noncestr": payInfo.noncestr, // 随机字符串
									"package": payInfo.package,  // 固定值
									"partnerid":payInfo.partnerid, // 微信支付商户号
									"prepayid":payInfo.prepayid, // 统一下单订单号
									"timestamp": payInfo.timestamp, // 时间戳（单位：秒）
									"sign": payInfo.paySign // 签名，这里用的 MD5 签名
								}
							this.$refs.payList.open();
							uni.requestPayment({
								"provider": "wxpay",
								"orderInfo": orderInfo,
								success(res) {
									// plus.nativeUI.toast("支付成功");
									// 订单支付成功跳转成功页面
									uni.redirectTo({
											url: "/pages/cart/payStatus?state=1",
										});
								},
								fail(e) {
									this.$emit("payFail", code);
									// plus.nativeUI.toast('支付错误')
									uni.redirectTo({
										url:
											"/pages/cart/payStatus"
									});;
								},
								complete: () => {
									uni.hideLoading();
								}
							})

						} else {
							uni.showToast({
								title: res.msg,
								icon: "none",
							});
							uni.redirectTo({
								url: "/pages/cart/payStatus",
							});
						}
					})
					.catch((err) => {
						uni.showToast({
							title: "网络连接失败，请稍后再试",
							icon: "none",
						});
					});
		},
	},
};
</script>

<style scoped lang="scss">
.pay-list {
	padding: 0 0 30rpx;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	z-index: 100;
	.close-wrap {
		padding: 30rpx;
	}
	.close-icon {
		width: 17rpx;
		height: 17rpx;
	}
	.pay-item {
		margin-bottom: 60rpx;
		padding: 0 30rpx;
		.circle-icon {
			margin-right: 60rpx;
			width: 36rpx;
			height: 36rpx;
		}
		font-size: 36rpx;
		color: #333333;
		image {
			margin-right: 25rpx;
			width: 50rpx;
			height: 44rpx;
		}
	}
	.pay-btn {
		margin: 0 30rpx;
		height: 80rpx;
		background: #ff7247;
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #fff;
	}
}
</style>
