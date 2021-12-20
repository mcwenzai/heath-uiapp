<template>
	<view class="order-item">
		<view class="store flex-between-center">
			<text>{{ info.storeName }}</text>

			<view
				class="order-status flex-center-center"
				v-if="info.status === 0"
			>
				<text>待付款</text>
				<text class="time flex-center-center">{{ tipText }}</text>
			</view>
			<view
				:class="[
					'order-status flex-center-center',
					info.status === 2 || info.status === 3 ? 'active' : '',
				]"
				v-if="info.status > 0"
			>
				<text> {{ info.status | formateStatus }} </text>
			</view>
		</view>
		<view class="goods-item-wrap">
			<view class="goods-wrap flex-between-center" @tap.stop="goDetail">
				<view class="goods flex-start-center">
					<block v-for="(item, index) in imgList" :key="index">
						<image
							:src="
								item.skuImgUrl ||
								'/static/images/no-img-small.png'
							"
							class="goods-img"
							mode=""
						></image>
					</block>

					<image
						src="/static/images/arrow_left.png"
						class="small-arrow-icon"
						mode="aspectFit"
						v-if="info.orderDetail && info.orderDetail.length > 3"
					></image>
				</view>
				<view class="total-count column flex-center-center">
					<text class="price"
						>¥{{ (info.payableMoney || 0) | formatePrice }}</text
					>
					<text class="count">共{{ info.number || 0 }}件</text>
				</view>
			</view>
			<view class="btn-wrap flex-end-center">
				<template v-if="info.status === 0">
					<view
						class="btn flex-center-center"
						@tap="showCancelTip = true"
						>取消订单</view
					>
					<view
						class="btn active flex-center-center"
						@tap="showPayPopup = true"
						>去支付</view
					>
				</template>

				<template v-if="info.status === 3">
					<view
						class="btn active flex-center-center"
						@tap="showGetGoodsTip = true"
						>确认收货</view
					>
				</template>
				<template v-if="info.status === 4">
					<view
						class="btn active flex-center-center"
						@tap="previewInvoice"
						>查看发票</view
					>
				</template>
			</view>
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
				:orderId="info.orderId"
				:showPopup="showPayPopup"
				@paySuccess="paySuccess"
				:totalMoney="info.payableMoney"
				@payFail="payFail"
				@closePayPopup="showPayPopup = false"
			></pay-popup>
		</view>
	</view>
</template>

<script>
import formatePrice from "@/mixins/formatePrice";
import rejectRemarksVue from "../../pages/salesman/rejectRemarks.vue";
export default {
	mixins: [formatePrice],
	props: {
		info: {
			default: {},
			type: Object,
		},
		infoIdx: {
			default: 0,
			type: Number,
		},
	},
	data() {
		return {
			tipText: "   ",
			timer: null,
			showCancelTip: false,
			showPayPopup: false,
			showGetGoodsTip: false,
		};
	},
	computed: {
		imgList() {
			const list = this.info.orderDetail;
			if (!list || !list.length) return [];
			if (list.length > 3) {
				return list.slice(0, 3);
			}
			return list;
		},
	},
	watch: {
		info: {
			handler: function (v, oV) {
				// console.log(v, oV);
				const t = v.createTime;
				const s = v.status;
				// console.log(v);
				if (t && s === 0) {
					this.countDown(t);
				}
			},
			deep: true,
			immediate: true,
		},
	},
	filters: {
		formateStatus(v) {
			if (v === 1) return "已取消";
			if (v === 2 || v === 3) return "待收货";
			if (v === 4) return "已完成";
		},
	},
	methods: {
		goDetail() {
			// console.log(new Date(this.info.createTime), this.info.createTime);
			let orderId = this.info.orderId;
			let orderType = 0;
			if (this.info.isSubOrder) {
				orderType = 1;
			}
			this.$goPage("/pages/cart/orderDetail", {
				orderId: orderId,
				orderType: orderType,
			});
		},
		async cancelOrder() {
			this.showCancelTip = false;
			uni.showLoading({
				title: "加载中",
			});
			const res = await this.$myRequest({
				url: "/order/orders/cancelOrder",
				data: {
					orderId: this.info.orderId,
				},
			});
			uni.hideLoading();
			// console.log(res);
			if (res.success !== 1) {
				if (res.data && res.data.code) {
					this.info.status = res.data.code;
					uni.showToast({
						title: res.data.msg,
						icon: "none",
					});
					this.$emit("cancelOrder", this.infoIdx);
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
						this.info.status = 1;
						this.$emit("cancelOrder", this.infoIdx);
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
			// console.log(time, dif);
			if (dif >= 24 * 60 * 60 * 1000) {
				this.tipText = "    ";
				clearInterval(this.timer);
				this.timer = null;
				this.info.status = 1;
			} else {
				const v = 24 * 60 * 60 * 1000 - dif;
				const h = Math.floor(v / (60 * 60 * 1000));
				const m = Math.floor((v - h * 60 * 60 * 1000) / (60 * 1000));
				this.tipText = `剩余${h}小时${m}分`;
			}
		},
		paySuccess() {
			this.showPayPopup = false;
		},
		payFail(type) {
			this.info.status = type;
			this.showPayPopup = false;
			this.$emit("cancelOrder", this.infoIdx);
		},
		async confirmGetGoods() {
			this.showGetGoodsTip = false;
			uni.showLoading({ title: "加载中" });
			const res = await this.$myRequest({
				url: "/order/orders/receiving",
				data: {
					orderSubId: this.info.orderId,
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
						this.info.status = 4;
						this.$emit("cancelOrder", this.infoIdx);
					}, 2000);
				},
			});
		},
		async previewInvoice() {
			uni.showLoading({
				title: "加载中",
			});

			const res = await this.$myRequest({
				url: "/order/orders/getInvoiceInfo",
				data: {
					orderSubId: this.info.orderId,
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
	},
};
</script>

<style lang="scss" scoped>
.order-item {
	margin-bottom: 20rpx;
	padding: 0 30rpx;
	background: #fff;
	border-radius: 10rpx;
	.store {
		padding: 30rpx 0 20rpx;
		color: #333333;
		font-size: 32rpx;
		border-bottom: 1rpx solid #eaeaea;
		.order-status {
			color: #666666;
			&.active {
				color: #ff7247;
			}
		}
		.time {
			margin-left: 10rpx;
			padding: 0;
			padding: 5rpx 20rpx;
			background: #ffede7;
			font-size: 24rpx;
			color: #ff7247;
			border-radius: 20rpx;
			display: inline-block;
			height: 40rpx;
		}
	}
	.goods-item-wrap {
		.goods-wrap {
			padding: 30rpx 0;
			// border-bottom: 1rpx solid #eaeaea;
		}
		.goods-img {
			margin-right: 30rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
			// border: 1rpx solid #ffede7;
		}
		.btn-wrap {
			padding: 22rpx 0 30rpx;
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
				&.active {
					background: #ff7247;
					color: #fff;
				}
			}
		}
		.price {
			color: #333;
			font-weight: bold;
			font-size: 32rpx;
		}
		.count {
			color: #333333;
			font-size: 28rpx;
		}
	}
}
</style>
