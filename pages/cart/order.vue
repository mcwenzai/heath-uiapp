<template>
	<view class="content page-height">
		<view
			class="address-info flex-start-center content-wrap"
			v-if="addressInfo.id"
			@click="changeAddress"
		>
			<view class="address column">
				<text>{{ cityInfo }}</text>
				<text>{{ addressInfo.address }}</text>
				<text>{{ addressInfo.consignee }} {{ addressInfo.phone }}</text>
			</view>
			<image
				src="/static/images/arrow_left.png"
				class="small-arrow-icon"
				mode="aspectFit"
			></image>
		</view>
		<!-- 用户地址信息为空 -->
		<view
			class="address-info flex-between-center content-wrap"
			@click="newAddress"
			v-if="!addressInfo.id"
		>
			<view class="address flex-start-center">
				<image
					src="/static/images/cart/add.png"
					class="add-icon"
				></image
				>填写收件人信息
			</view>
			<image
				src="/static/images/arrow_left.png"
				class="small-arrow-icon"
				mode="aspectFit"
			></image>
		</view>
		<view
			class="goods-list content-wrap"
			v-for="(item, index) in orderInfo"
			:key="index"
		>
			<view class="store flex-start-center">
				<image :src="item.logoUrl" class="store-img"></image>
				<text>{{ item.storeName }}</text>
			</view>
			<view class="goods-item-wrap">
				<view class="goods-wrap flex-between-center">
					<view
						class="goods flex-start-center"
						@click="openModel(item)"
					>
						<image
							:src="
								items.skuImgUrl ||
								'/static/images/no-img-small.png'
							"
							class="goods-img"
							mode=""
							v-for="(items, indexs) in item.goodsList.slice(
								0,
								3
							)"
							:key="indexs"
						></image>
						<image
							v-if="item.goodsList.length >= 3"
							src="/static/images/arrow_left.png"
							class="small-arrow-icon"
							mode="aspectFit"
						></image>
					</view>
					<view class="total-count column flex-center-center">
						<text class="price"
							>¥{{ item.totalPrices.toFixed(2) }}</text
						>
						<text class="count"
							>共{{ item.goodsList.length }}件</text
						>
					</view>
				</view>
				<view class="remark flex-between-center">
					<text class="label">配送</text>
					<view class="flex-start-center">快递配送</view>
				</view>
			</view>
		</view>
		<view class="content-wrap">
			<view class="info-item flex-between-center">
				<text>商品金额</text>
				<text>¥ {{ totalMoney.toFixed(2) }}</text>
			</view>
			<view class="info-item flex-between-center">
				<text>运费</text>
				<text>¥ {{ carriage | formatePrice }}</text>
			</view>
			<view class="info-item strong flex-between-center">
				<text>合计</text>
				<text>¥ {{ totalMoneyFormate.toFixed(2) }}</text>
			</view>
		</view>
		<view class="content-wrap">
			<view class="info-item flex-between-center">
				<text>赠送商品积分</text>
				<text>{{ totalPoint }}</text>
			</view>
			<view class="info-item strong flex-between-center">
				<text>合计</text>
				<text>{{ totalPoint }}</text>
			</view>
		</view>
		<view class="content-wrap">
			<view class="info-item flex-between-center" @click="changeInvoice">
				<!-- <text>发票</text>
				<view class="flex-start-center">普票<image src="/static/images/arrow_left.png" class="small-arrow-icon" mode="aspectFit"></image></view> -->
				<text>发票抬头</text>
				<view class="flex-start-center"
					>{{ invoiceInfo.invoiceHeader
					}}<image
						src="/static/images/arrow_left.png"
						class="small-arrow-icon"
						mode="aspectFit"
					></image>
				</view>
			</view>
		</view>
		<view style="height: 150rpx"></view>
		<view class="footer fixed-bottom flex-between-center" style="bottom: 0">
			<view class="footer-left flex-start-center">
				应付：<text class="total"
					>¥{{ totalMoneyFormate.toFixed(2) }}</text
				>
			</view>
			<view class="submit-btn flex-center-center" @click="handleSubmit"
				>提交订单</view
			>
		</view>
		<uni-popup ref="goodsList" type="bottom">
			<view class="popup-goods-list">
				<view class="header flex-between-center">
					<text>商品清单</text>
					<view class="close-wrap" @click="$refs.goodsList.close()">
						<image
							src="/static/images/cart/close.png"
							class="close-icon"
							mode="aspectFit"
						></image>
					</view>
				</view>
				<view
					class="goods-item flex-start-center"
					v-for="(item, index) in inventory"
					:key="index"
				>
					<image
						:src="
							item.skuImgUrl || '/static/images/no-img-small.png'
						"
						class="goods-img"
					></image>
					<view class="goods-info">
						<view class="name"
							>{{ item.goodsName }} {{ item.skuName }}</view
						>
						<view class="store-name">{{ item.brandsName }}</view>
						<view class="price flex-between-center">
							<text>¥ {{ item.price }}</text>
							<text>数量 {{ item.amount }}</text>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<uni-popup
			ref="payList"
			type="bottom"
			:mask-click="false"
			@maskClick="closePayModel"
		>
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
						totalMoneyFormate.toFixed(2)
					}}</view
				>
			</view>
		</uni-popup>
		<u-modal
			title="提 示"
			@confirm="cancelPay()"
			@cancel="showModel = false"
			:cancel-style="cancelStyle"
			negative-top="160"
			v-model="showModel"
			:confirm-style="confirmStyle"
			:content-style="contentStyle"
			:title-style="titleStyle"
			:mask-close-able="true"
			:show-cancel-button="true"
			confirm-color="#FF7247"
			cancel-color="#999999"
			:content="content"
		></u-modal>
		<u-mask :show="showMask"></u-mask>
	</view>
</template>

<script>
import { fnThrottle } from "@/libs/tool";
import formatePrice from "@/mixins/formatePrice";
export default {
	mixins: [formatePrice],
	data() {
		return {
			showModel: false,
			content: "是否取消订单支付",
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
			payIdx: 0,
			payList: [
				{
					icon: "/static/images/cart/wx.png",
					label: "微信支付",
					type: 0,
				},
			],
			addressInfo: null,
			invoiceInfo: {},
			orderInfo: [],
			inventory: [],
			totalMoney: 0, //商品总额
			carriage: 0, //运费
			sourceType: 0,
			totalPoint: 0,
			orderId: "",
			cityInfo: "",
			showMask: false,
		};
	},
	computed: {
		totalMoneyFormate() {
			const res = (this.totalMoney || 0) + (this.carriage || 0);
			return Math.round(res * 100) / 100;
		},
	},
	onLoad(data) {
		// 发票信息修改
		uni.$on("invoiceUpdate", (data) => {
			this.invoiceInfo = data;
		});
		this.sourceType = data.sourceType; //跳转的类型：0为单个商品订单、1为购物车订单
		this.orderInfo = uni.getStorageSync("orderInfo");
		this.cityInfo = uni.getStorageSync("cityInfo").addressName;
		if (this.sourceType == 0) {
			// 计算单个商品下单总金额
			this.totalMoney = this.orderInfo[0].totalPrices;
			// 积分计算
			this.totalPoint =
				this.orderInfo[0].skuData.givePoint *
				this.orderInfo[0].totalAmount;
		} else if (this.sourceType == 1) {
			// 计算购物车下单总金额
			this.orderInfo.forEach((item, index) => {
				this.totalMoney = this.totalMoney + item.totalPrices;
				// 积分计算
				item.goodsList.forEach((items, indexs) => {
					this.totalPoint =
						this.totalPoint + items.givePoint * items.amount;
				});
			});
		}
		// 运费统计
		this.orderInfo.forEach((item, index) => {
			this.countCarriage(item.storeId, item.totalPrices);
		});
		// 提交订单节流
		this.handleSubmit = fnThrottle(this.handleSubmit, 1000);
		// 默认收货地址
		this.addressInfo = uni.getStorageSync("defaultAddress");
		// 默认发票信息
		this.invoiceInfo = uni.getStorageSync("defaultInvoice");
		// 地址信息修改
		uni.$on("addressUpdate", (data) => {
			this.addressInfo = data;
		});
	},
	onShow() {
		this.addressInfo = uni.getStorageSync("defaultAddress");
	},
	methods: {
		// 打开商品清单弹框
		openModel(params) {
			this.inventory = params.goodsList;
			if (this.sourceType == 0) {
				this.inventory[0].amount = this.orderInfo[0].totalAmount;
			}
			this.$refs.goodsList.open();
		},
		// 打开取消订单模态框
		closePayModel() {
			this.showModel = true;
		},
		// 确认取消订单
		cancelPay() {
			this.$refs.payList.close();
			uni.redirectTo({
				url: "/pages/cart/orderList?index=1",
			});
		},
		// 支付方式切换
		handleChangePay(index) {
			this.payIdx = index;
		},
		// 提交订单类型判断
		handleSubmit() {
			if (!this.addressInfo)
				return uni.showToast({ title: "请完善地址信息", icon: "none" });
			// 0~为单商品订单
			// 1~购物车商品订单
			if (this.sourceType == 0) {
				this.subGoodsOrder();
			} else if (this.sourceType == 1) {
				this.subCartOrder();
			}
		},
		// 订单支付
		handleDetail() {
			if (
				!plus.runtime.isApplicationExist({
					pname: "com.tencent.mm",
					action: "weixin://",
				})
			)
				return uni.showToast({ title: "请先安装微信", icon: "none" });
			let customerId = uni.getStorageSync("customerId");
			let payUrl = `/pay/wxPay/wxPay?orderId=${this.orderId}`;
			this.$myRequest({
				method: "GET",
				url: payUrl,
			})
				.then((res) => {
					uni.$emit("cartUpdate", {});
					if (res.success === 1) {
						let payInfo = res.data.packageInfo;
						let orderInfo = {
							appid: payInfo.appid, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
							noncestr: payInfo.noncestr, // 随机字符串
							package: payInfo.package, // 固定值
							partnerid: payInfo.partnerid, // 微信支付商户号
							prepayid: payInfo.prepayid, // 统一下单订单号
							timestamp: payInfo.timestamp, // 时间戳（单位：秒）
							sign: payInfo.paySign, // 签名，这里用的 MD5 签名
						};
						// this.$refs.payList.open();
						uni.requestPayment({
							provider: "wxpay",
							orderInfo: orderInfo,
							success(res) {
								// plus.nativeUI.toast("支付成功");
								// 订单支付成功跳转成功页面
								uni.redirectTo({
									url:
										"/pages/cart/payStatus?state=1&orderId=" +
										this.orderId,
								});
							},
							fail(e) {
								// plus.nativeUI.toast("支付失败");
								uni.redirectTo({
									url: "/pages/cart/payStatus",
								});
							},
							complete: () => {},
						});
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
		// 提交单商品订单
		subGoodsOrder() {
			if (!this.addressInfo.id)
				return uni.showToast({ title: "请完善地址信息", icon: "none" });
			let customerId = uni.getStorageSync("customerId");
			let URL = `/order/orders/createOrder?storeId=${
				this.orderInfo[0].storeId
			}&goodsId=${this.orderInfo[0].goodsId}&skuPriceId=${
				this.orderInfo[0].skuPriceId
			}&skuId=${this.orderInfo[0].skuData.id}&amount=${
				this.orderInfo[0].totalAmount
			}&addressId=${this.addressInfo.id}&invoiceId=${
				this.invoiceInfo.id ? this.invoiceInfo.id : ""
			}&customerId=${customerId}`;
			uni.showLoading();
			this.showMask = true;
			this.$myRequest({
				method: "GET",
				url: URL,
			})
				.then((res) => {
					uni.hideLoading();
					this.showMask = false;
					if (res.success === 1) {
						this.orderId = res.data.order.id;
						this.$refs.payList.open();
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {
					// uni.showToast({
					// 	title: "网络连接失败，请稍后再试",
					// 	icon: "none",
					// });
				});
		},
		// 购物车下单
		subCartOrder() {
			if (!this.addressInfo.id)
				return uni.showToast({ title: "请完善地址信息", icon: "none" });
			let customerId = uni.getStorageSync("customerId");
			let data = {
				cartIds: [],
				addressId: this.addressInfo.id,
				invoiceId: this.invoiceInfo.id,
				customerId: customerId,
			};
			this.orderInfo.forEach((item, index) => {
				item.goodsList.forEach((items, indexs) => {
					data.cartIds.push(items.cartId);
				});
			});
			uni.showLoading();
			this.showMask = true;
			this.$myRequest({
				method: "POST",
				url: "/order/orders/batchCreateOrder",
				data: data,
			})
				.then((res) => {
					uni.hideLoading();
					this.showMask = false;
					if (res.success === 1) {
						this.orderId = res.data.order.id;
						this.$refs.payList.open();
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
							duration: 1000,
						});
					}
				})
				.catch((err) => {
					// uni.showToast({
					// 	title: "网络连接失败，请稍后再试",
					// 	icon: "none",
					// });
				});
		},
		// 新建地址
		newAddress() {
			uni.navigateTo({
				url: "/pages/address/edit?sourceType=2",
			});
		},
		// 更换地址
		changeAddress() {
			uni.navigateTo({
				url: "/pages/address/list?sourceType=" + this.sourceType,
			});
		},
		// 更换发票
		changeInvoice() {
			uni.navigateTo({
				url: "/pages/invoice/list?sourceType=" + this.sourceType,
			});
		},
		// 计算运费
		countCarriage(param1, param2) {
			const customerId = uni.getStorageSync("customerId");
			let provincesCode = uni.getStorageSync("userInfo").provincesCode;
			let carriageURL = `/order/orders/calculateDeliveryFee?storeId=${param1}&provincesCode=${provincesCode}&orderMoney=${param2.toFixed(
				2
			)}&customerId=${customerId}`;
			this.$myRequest({
				method: "GET",
				url: carriageURL,
			})
				.then((res) => {
					if (res.success === 1) {
						this.carriage = this.carriage + res.data.deliveryFee;
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

<style lang="scss" scoped>
.content {
	padding: 30rpx 30rpx 88rpx;
	background-color: #f7f6f6;
}
.content-wrap {
	margin-bottom: 20rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 10rpx;
}
.address-info {
	font-size: 32rpx;
	color: #333333;
	line-height: 48rpx;

	.address {
		flex: 1;
	}
	.add-icon {
		margin-right: 20rpx;
		width: 32rpx;
		height: 32rpx;
	}
}
.goods-list {
	padding: 0;
	.store {
		padding: 20rpx 30rpx;
		color: #333333;
		font-size: 32rpx;
		border-bottom: 1rpx solid #eaeaea;
	}
	.store-img {
		margin-right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		border-radius: 10rpx;
	}
	.goods-item-wrap {
		padding: 0 30rpx;
		.goods-wrap {
			padding: 30rpx 0;
		}
		.goods-img {
			margin-right: 30rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}
		.remark {
			border-top: 1rpx solid #f7f7f7;
			padding: 30rpx 0;
			font-size: 32rpx;
			color: #333333;
			.label {
				color: #666;
			}
		}
		.price {
			color: #ff5d2b;
			font-size: 32rpx;
		}
		.count {
			color: #333333;
			font-size: 28rpx;
		}
	}
}
.info-item {
	margin-bottom: 30rpx;
	color: #666666;
	font-size: 32rpx;
	&:last-child {
		margin-bottom: 0;
	}
	&.strong {
		color: #333;
		color: #333;
		font-weight: bold;
	}
}
.footer {
	padding: 20rpx 30rpx;
	font-size: 32rpx;
	color: #333333;
	background: #fff;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
	.total {
		color: #ff5d2b;
		font-size: 32rpx;
		font-weight: bold;
	}
	.submit-btn {
		margin-left: 30rpx;
		width: 240rpx;
		height: 60rpx;
		color: #ffffff;
		background: #ff7247;
		border-radius: 30rpx;
		font-size: 28rpx;
	}
}
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
.popup-goods-list {
	padding: 0 0 1rpx;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	z-index: 100;
	.header {
		padding: 0 0 0 30rpx;
		font-size: 28rpx;
		color: #333;
	}
	.close-wrap {
		padding: 30rpx;
	}
	.close-icon {
		width: 17rpx;
		height: 17rpx;
	}
	.goods-item {
		margin-bottom: 50rpx;
		padding: 0 30rpx;
	}
	.goods-img {
		margin-right: 30rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
	}
	.goods-info {
		flex: 1;
	}
	.name {
		margin-bottom: 5rpx;
		font-size: 36rpx;
		color: #333;
	}
	.store-name {
		margin-bottom: 10rpx;
		font-size: 24rpx;
		color: #999;
	}
	.price {
		font-size: 32rpx;
		color: #333;
	}
}
</style>
