<template>
	<view class="content page-height">
		<!-- 待付款 -->
		<view
			class="order-status column flex-start-center"
			v-if="info.order.status === 0"
		>
			<view class="status flex-start-center">
				<image
					src="/static/images/cart/status-wait-pay.png"
					mode="aspectFit"
					class="status-icon"
				></image
				>待付款
			</view>
			<text decode
				>需付款¥{{
					info.order.payableMoney | formatePrice
				}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;剩余：{{ tipText }}</text
			>
		</view>
		<!-- 待发货 -->
		<view
			class="order-status column flex-start-center"
			v-if="
				(orderType === 0 && info.order && info.order.status === 2) ||
				(orderType === 1 && info.orderSub && info.orderSub.status === 2)
			"
		>
			<view class="status flex-start-center">
				<image
					src="/static/images/cart/status-wait-send.png"
					mode="aspectFit"
					class="status-icon"
				></image
				>待发货
			</view>
			<text decode>暂无物流消息</text>
		</view>
		<!-- 已发货 -->
		<view
			class="order-status column flex-start-center"
			v-if="
				(orderType === 0 && info.order && info.order.status === 3) ||
				(orderType === 1 && info.orderSub && info.orderSub.status === 3)
			"
			:style="
				'height:' +
				(100 + info.deliveryExpressList.length * 100) +
				'rpx'
			"
		>
			<view class="status flex-start-center">
				<image
					src="/static/images/cart/status-send.png"
					mode="aspectFit"
					class="status-icon"
				></image
				>已发货
			</view>

			<template
				v-if="
					info.deliveryExpressList &&
					info.deliveryExpressList.length &&
					info.deliveryExpressList[0] &&
					info.deliveryExpressList[0].expressTrace &&
					info.deliveryExpressList[0].expressTrace.length
				"
			>
				<block
					v-for="(item, index) in info.deliveryExpressList"
					:key="index"
				>
					<view
						class="express flex-between-center"
						@click="goExpress(item)"
						style="margin-top: 10rpx"
						v-if="item.expressTrace"
					>
						<view class="column" style="flex: 1">
							<view class="overflow"
								>{{ item.expressCompany || "" }}：{{
									item.expressTrace &&
									item.expressTrace[0] &&
									item.expressTrace[0].context
								}}</view
							>
							<view>{{
								(item.expressTrace &&
									item.expressTrace[0] &&
									item.expressTrace[0].time) ||
								""
							}}</view>
						</view>
						<image
							src="/static/images/arrow.png"
							class="arrow-icon"
							mode="aspectFit"
						></image>
					</view>
				</block>
			</template>
			<template v-else>
				<text class="mt10">暂无物流消息</text>
			</template>
		</view>
		<!-- 已完成 -->
		<view
			class="order-status column flex-start-center"
			v-if="
				(orderType === 0 && info.order && info.order.status === 4) ||
				(orderType === 1 && info.orderSub && info.orderSub.status === 4)
			"
			:style="
				'height:' +
				(100 + info.deliveryExpressList.length * 100) +
				'rpx;'
			"
		>
			<view class="status flex-start-center">
				<image
					src="/static/images/cart/status-finish.png"
					mode="aspectFit"
					class="status-icon"
				></image
				>已完成
			</view>
			<template
				v-if="
					info.deliveryExpressList &&
					info.deliveryExpressList.length &&
					info.deliveryExpressList[0] &&
					info.deliveryExpressList[0].expressTrace &&
					info.deliveryExpressList[0].expressTrace.length
				"
			>
				<block
					v-for="(item, index) in info.deliveryExpressList"
					:key="index"
				>
					<view
						class="express flex-between-center"
						@click="goExpress(item)"
						v-if="item.expressTrace"
						style="margin-top: 10rpx"
					>
						<view class="column" style="flex: 1">
							<view class="overflow">
								{{
									item.expressCompany
										? item.expressCompany + "："
										: ""
								}}
								您的快件已由客户指定地点代收，感谢您使用
							</view>
							<view>{{
								orderType === 0
									? info.order && info.order.receiveTime
									: info.orderSub && info.orderSub.receiveTime
							}}</view>
						</view>
						<image
							src="/static/images/arrow.png"
							class="arrow-icon"
							mode="aspectFit"
						></image>
					</view>
				</block>
			</template>
			<template v-else>
				<text class="mt10">暂无物流消息</text>
			</template>
		</view>
		<!-- 已取消 -->
		<view
			class="order-status column flex-start-center"
			v-if="info.order.status === 1"
			style="align-items: center; justify-content: center"
		>
			<view class="status flex-start-center" style="margin-top: -25rpx">
				<image
					src="/static/images/cart/status-cancel.png"
					mode="aspectFit"
					class="status-icon"
				></image
				>已取消
			</view>
			<text>{{ info.order.remark }}</text>
		</view>

		<!-- <view
			class="order-status column flex-start-center"
			style="align-items: center; justify-content: center"
			v-if="info.order.status === 0"
		>
			
			<template>
				<view
					class="status flex-start-center"
					style="margin-top: -25rpx"
				>
					<image
						src="/static/images/cart/refunding.png"
						mode="aspectFit"
						class="status-icon"
					></image
					>退款中
				</view>
				<view @tap="goRefund">
					<text> {{ info.order.remark }}</text> 您的 ></view
				>
			</template>
		</view> -->

		<view class="padding">
			<!-- <view class="address-info flex-start-center content-wrap">
				<view class="adddres column">
					<text>钱款去向:</text>
					<text>您支付金金额回原路退回</text>
				</view>
			</view> -->
			<view class="address-info flex-start-center content-wrap">
				<view class="adddres column">
					<view>
						{{ info.order.provincesName }}{{ info.order.cityName
						}}{{ info.order.areaName
						}}{{ info.order.deliveryAddress }}
					</view>
					<view style=""
						>{{ info.order.deliveryName }}
						{{ info.order.deliveryPhone }}</view
					>
				</view>
			</view>
			<template v-if="orderType == 0">
				<block v-for="(item, index) in info.orderSbu" :key="index">
					<view class="goods-list content-wrap">
						<view
							class="store flex-start-center"
							@tap="goStore(item)"
						>
							<text>{{ item.orderDetail.storeName }}</text>
							<image
								src="/static/images/arrow_left.png"
								class="small-arrow-icon"
								mode="aspectFit"
							></image>
						</view>
						<block
							v-for="(good, goodIdx) in item.orderDetailList"
							:key="goodIdx"
						>
							<view class="goods-item flex-start-center">
								<image
									:src="
										good.skuImgUrl ||
										'/static/images/no-img-small.png'
									"
									class="goods-img"
								></image>
								<view class="goods-info">
									<view class="name"
										>{{ good.goodsName }}
										{{ good.skuName }}</view
									>
									<view class="store-name">{{
										good.brandName
									}}</view>
									<view class="price flex-between-center">
										<text
											>¥{{
												good.price | formatePrice
											}}</text
										>
										<text>数量 {{ good.amount }}</text>
									</view>
								</view>
							</view>
						</block>
					</view>
				</block>
			</template>
			<template v-if="orderType == 1">
				<view class="goods-list content-wrap">
					<view class="store flex-start-center" @tap="goStore(info)">
						<text>{{
							info.orderSub && info.orderSub.storeName
						}}</text>
						<image
							src="/static/images/arrow_left.png"
							class="small-arrow-icon"
							mode="aspectFit"
						></image>
					</view>
					<block
						v-for="(good, goodIdx) in info.orderDetailList"
						:key="goodIdx"
					>
						<view class="goods-item flex-start-center">
							<image
								:src="
									good.skuImgUrl ||
									'/static/images/no-img-small.png'
								"
								class="goods-img"
							></image>
							<view class="goods-info">
								<view class="name"
									>{{ good.goodsName }}
									{{ good.skuName }}</view
								>
								<view class="store-name">{{
									good.brandName
								}}</view>
								<view class="price flex-between-center">
									<text
										>¥{{ good.price | formatePrice }}</text
									>
									<text>数量 {{ good.amount }}</text>
								</view>
							</view>
						</view>
					</block>
				</view>
			</template>
			<view class="content-wrap">
				<view class="info-item flex-between-center">
					<text>订单编号</text>
					<text>{{
						info.order.status == 0
							? info.order.id
							: info.orderSub
							? info.orderSub.id
							: info.order.id
					}}</text>
				</view>
				<view class="info-item flex-between-center">
					<text> 创建时间</text>
					<text>{{ info.order.createTime }}</text>
				</view>
				<template v-if="info.order.status > 1">
					<view class="info-item flex-between-center">
						<text>支付方式</text>
						<text> {{ info.order.payType | formatePayType }}</text>
					</view>
					<view class="info-item flex-between-center">
						<text>支付时间</text>
						<text>{{ info.order.payTime }}</text>
					</view>
				</template>
			</view>
			<view class="content-wrap" v-if="orderType == 0">
				<view class="info-item flex-between-center">
					<text>商品金额</text>
					<text
						>¥{{
							info.order && info.order.goodsMoney | formatePrice
						}}</text
					>
				</view>
				<view class="info-item flex-between-center">
					<text>运费</text>
					<text
						>¥{{
							info.order && info.order.deliveryFee | formatePrice
						}}</text
					>
				</view>
				<view
					class="info-item flex-between-center"
					style="justify-content: flex-end"
				>
					<text>{{
						info.order.status > 1 ? "已支付:" : "需支付:"
					}}</text>
					<text
						style="
							color: #333;
							margin-left: 10rpx;
							font-weight: bold;
						"
					>
						¥{{
							info.order && info.order.payableMoney | formatePrice
						}}</text
					>
				</view>
			</view>
			<view class="content-wrap" v-else>
				<view class="info-item flex-between-center">
					<text>商品金额</text>

					<text
						>¥{{
							info.orderSub &&
							info.orderSub.goodsMoney | formatePrice
						}}</text
					>
				</view>
				<view class="info-item flex-between-center">
					<text>运费</text>

					<text
						>¥{{
							info.orderSub &&
							info.orderSub.deliveryFee | formatePrice
						}}</text
					>
				</view>
				<view
					class="info-item flex-between-center"
					style="justify-content: flex-end"
				>
					<text>{{
						info.order.status > 1 ? "已支付:" : "需支付:"
					}}</text>

					<text
						style="
							color: #333;
							margin-left: 10rpx;
							font-weight: bold;
						"
						>¥{{
							info.orderSub &&
							info.orderSub.payableMoney | formatePrice
						}}</text
					>
				</view>
			</view>
			<view class="content-wrap" v-if="info.order.integral">
				<view class="info-item flex-between-center">
					<text>赠送商品积分</text>
					<text>{{ info.order.integral }}</text>
				</view>
				<view class="info-item strong flex-between-center">
					<text>合计</text>
					<text>{{ info.order.integral }}</text>
				</view>
			</view>
			<view class="content-wrap" v-if="info.order.invoiceInfo">
				<view class="info-item flex-between-center">
					<template>
						<text>发票抬头</text>
						<view class="flex-start-center" @tap="goInvoiceDetail"
							>{{ info.order.invoiceInfo.invoiceHeader
							}}<image
								src="/static/images/arrow_left.png"
								class="small-arrow-icon"
								mode="aspectFit"
							></image>
						</view>
					</template>
				</view>
			</view>
		</view>
		<view class="footer fixed-bottom flex-end-center" style="bottom: 0">
			<template v-if="info.order.status === 0">
				<view
					class="btn flex-center-center"
					@tap="handleCancel"
					v-if="info.order.status === 0"
					>取消订单</view
				>
				<view
					class="btn active flex-center-center"
					@tap="hanleClickNext"
					>去支付</view
				>
			</template>
			<template
				v-if="
					(orderType === 0 &&
						info.order &&
						info.order.status === 3) ||
					(orderType === 1 &&
						info.orderSub &&
						info.orderSub.status === 3)
				"
			>
				<view
					class="btn active flex-center-center"
					@tap="showGetGoodsTip = true"
					>确认收货</view
				>
			</template>
			<template
				v-if="
					(orderType === 0 &&
						info.orderSub &&
						info.order.status === 4) ||
					(orderType === 1 &&
						info.orderSub &&
						info.orderSub.status === 4)
				"
			>
				<view
					class="btn active flex-center-center"
					@tap="previewInvoice"
					>查看发票</view
				>
			</template>
		</view>

		<my-show-modal
			:show="showCancelTip"
			@confirm="cancelOrder"
			@cancel="showCancelTip = false"
			content="是否确认取消订单？"
		></my-show-modal>
		<my-show-modal
			:show="showGetGoodsTip"
			@confirm="confirmGetGoods"
			@cancel="showGetGoodsTip = false"
			content="是否确认收货？"
		></my-show-modal>
		<view>
			<pay-popup
				:orderId="info.order.id"
				:showPopup="showPayPopup"
				@paySuccess="paySuccess"
				:totalMoney="info.order.payableMoney"
				@payFail="payFail"
				@closePayPopup="showPayPopup = false"
			></pay-popup>
		</view>
	</view>
</template>

<script>
import formatePrice from "@/mixins/formatePrice";
export default {
	mixins: [formatePrice],
	data() {
		return {
			info: {
				order: {},
				address: {},
				orderSbu: [],
				invoice: {},
				orderSbu: {},
			},
			tipText: "   ",
			timer: null,
			showCancelTip: false,
			showPayPopup: false,
			orderId: null,
			// 区分订单类型，1为子订单
			orderType: 0,
			showGetGoodsTip: false,
		};
	},
	onLoad(options) {
		const dataStr = options.params;
		const data = JSON.parse(decodeURIComponent(dataStr));
		this.orderId = data.orderId;
		this.orderType = data.orderType;

		this.getDetail();
	},
	filters: {
		formatePayType(v) {
			const arr = ["微信", "支付宝"];
			return arr[v] || "";
		},
	},
	methods: {
		goExpress(item) {
			const { provincesName, cityName, deliveryAddress, areaName } =
				this.info.order;
			const addr = provincesName + cityName + areaName + deliveryAddress;
			uni.navigateTo({
				url:
					"/pages/cart/delivery?info=" +
					JSON.stringify(item) +
					"&address=" +
					addr,
			});
		},
		async getDetail() {
			uni.showLoading({
				title: "加载中",
			});
			let url = "/order/orders/orderDetail";
			let params = {
				orderId: this.orderId,
			};
			// 若为子订单，切换请求地址和请求参数
			if (this.orderType == 1) {
				url = "/order/orders/orderSubDetail";
				params = {
					orderSubId: this.orderId,
				};
			}
			const res = await this.$myRequest({
				url: url,
				data: params,
			});
			uni.hideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			const data = res.data;
			data.order.invoiceInfo = data.order.invoiceInfo
				? JSON.parse(data.order.invoiceInfo)
				: null;
			this.info = data;
			this.dealExpressInfo();
			if (data.order.createTime && data.order.status === 0) {
				this.countDown(data.order.createTime);
			}
		},
		dealExpressInfo() {
			const data = this.info.deliveryExpressList;
			if (data && data.length) {
				data.forEach((item) => {
					if (item.expressTrace) {
						const info = JSON.parse(item.expressTrace);
						item.expressTrace = info;
					}
				});
			}
		},
		async cancelOrder() {
			this.showCancelTip = false;
			uni.showLoading({
				title: "加载中",
			});
			const res = await this.$myRequest({
				url: "/order/orders/cancelOrder",
				data: {
					orderId: this.info.order.id,
				},
			});
			uni.hideLoading();
			if (res.success !== 1) {
				if (res.data && res.data.code) {
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					setTimeout(() => {
						this.getDetail();
					}, 2000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
				return;
			}

			uni.showToast({
				title: "成功取消订单",
				icon: "none",
				success: () => {
					setTimeout(() => {
						this.info.order.status = 1;
					}, 1000);
				},
			});
		},
		countDown(t) {
			const v = t.replace(/-/g, "/");
			this.getCountDownTip(v);
			this.timer = setInterval(() => {
				this.getCountDownTip(v);
			}, 60 * 1000);
		},
		getCountDownTip(t) {
			const nowTime = new Date().getTime();
			const time = new Date(t).getTime();
			const dif = nowTime - time;
			if (dif >= 24 * 60 * 60 * 1000) {
				this.tipText = "    ";
				clearInterval(this.timer);
				this.timer = null;
			} else {
				const v = 24 * 60 * 60 * 1000 - dif;
				const h = Math.floor(v / (60 * 60 * 1000));
				const m = Math.floor((v - h * 60 * 60 * 1000) / (60 * 1000));
				this.tipText = `${h}小时${m}分`;
			}
		},
		hanleClickNext() {
			const v = this.info.order.status;
			if (v !== 0) {
				uni.switchTab({
					url: "/pages/index/index",
				});
				return;
			}
			this.showPayPopup = true;
		},
		paySuccess() {
			this.showPayPopup = false;
		},
		handleCancel() {
			this.showCancelTip = true;
		},
		goStore(obj) {
			uni.redirectTo({
				url: "/pages/store/index?storeId=" + obj.orderDetail.storeId,
			});
		},
		payFail(type) {
			setTimeout(() => {
				this.showPayPopup = false;
				this.getDetail();
			}, 1000);
		},
		async confirmGetGoods() {
			this.showGetGoodsTip = false;
			uni.showLoading({ title: "加载中" });
			const id =
				this.orderType === 0
					? this.info.order.id
					: this.info.orderSub.id;
			const res = await this.$myRequest({
				url: "/order/orders/receiving",
				data: {
					orderSubId: id,
				},
			});
			uni.hideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			uni.showToast({
				title: "已确认收货",
				icon: "none",
				success: () => {
					setTimeout(() => {
						if (this.info.order) {
							this.info.order.status = 4;
						}
						if (this.info.orderSub) {
							this.info.orderSub.status = 4;
						}
					}, 2000);
				},
			});
		},
		async previewInvoice() {
			uni.showLoading({
				title: "加载中",
			});
			const id =
				this.orderType === 0
					? this.info.order.id
					: this.info.orderSub.id;
			const res = await this.$myRequest({
				url: "/order/orders/getInvoiceInfo",
				data: {
					orderSubId: id,
				},
			});
			uni.hideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}

			const data = res.data;
			if (!data || data.invoiceType === null) {
				uni.showToast({
					title: "暂无发票信息",
					icon: "none",
				});
				return;
			}
			if (data.invoiceType === 0) {
				uni.showToast({
					title: "已随货发送",
					icon: "none",
				});
				return;
			}
			if (data.invoiceType > 0) {
				uni.setStorageSync("orderInvoiceInfo", {
					type: data.invoiceType,
					url: data.invoiceUrl,
				});
				this.$goPage("/pages/cart/invoicePage");
				return;
			}
		},
		goInvoiceDetail() {
			const info = this.info.order.invoiceInfo || {};
			if (info) {
				this.$goPage("/pages/invoice/detail", { invoiceInfo: info });
			}
		},
		goRefund() {
			this.$goPage("/pages/cart/refund");
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 0 0 150rpx;
	background-color: #f7f6f6;

	.padding {
		position: relative;
		padding: 0 30rpx;
		margin-top: -35rpx;
	}
}
.mt10 {
	margin-top: 10rpx;
}
.order-status {
	// height: 200rpx;
	min-height: 200rpx;
	background: #ef7a52;
	color: #f7f6f6;
	font-size: 24rpx;

	.status {
		margin: 30rpx 0 10rpx;
		font-size: 34rpx;
		font-weight: bold;
	}

	.status-icon {
		margin-right: 10rpx;
		width: 47rpx;
		height: 41rpx;
	}

	.express {
		padding: 0 30rpx;
		width: 100%;

		.overflow {
			display: block;
			width: 650rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		.arrow-icon {
			width: 11rpx;
			height: 19rpx;
		}
	}
}

.content-wrap {
	margin-bottom: 20rpx;
	padding: 30rpx;
	background: #fff;
	border-radius: 10rpx;
}

.big-arrow-icon {
	margin-left: 30rpx;
	width: 32rpx;
	height: 27rpx;
}

.address-info {
	font-size: 32rpx;
	color: #333333;
	line-height: 48rpx;

	.address {
		flex: 1;
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

	.goods-item {
		padding: 30rpx;
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

.info-item {
	margin-bottom: 30rpx;
	color: #666666;
	font-size: 32rpx;

	&:last-child {
		margin-bottom: 0;
	}

	&.strong {
		color: #333;
		font-weight: bold;
	}
}

.footer {
	padding: 10rpx 30rpx;
	font-size: 32rpx;
	color: #333333;
	background-color: #fff;
	padding-bottom: calc(
		20rpx + constant(safe-area-inset-bottom)
	); /* 兼容 iOS < 11.2 */
	padding-bottom: calc(
		20rpx + env(safe-area-inset-bottom)
	); /* 兼容 iOS >= 11.2 */

	width: 750rpx;
	.btn {
		margin-left: 20rpx;
		min-width: 196rpx;
		padding: 0 20rpx;
		height: 60rpx;
		opacity: 1;
		border: 1rpx solid #ff5d2b;
		border-radius: 30rpx;
		color: #ff7247;
		font-size: 28rpx;
		margin-top: 10rpx;

		&.active {
			background: #ff7247;
			color: #fff;
		}
	}
}
</style>
