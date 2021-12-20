<template>
	<view class="item-wrap">
		<view class="item app-f app-f-aic" :style="itemStyle">
			<view class="name" :style="nameStyle" @tap="goDetail">{{
				info.goodsName
			}}</view>
			<view class="app-f-f1" :style="specStyle" @tap="goDetail"
				>{{ info.skuName }}/{{ info.effectRatio }}</view
			>
			<view class="buy-price app-f-f1" @tap="goDetail">{{
				info.price | formatePrice
			}}</view>
			<view class="cart" @click="addGoodsCart">
				<image :src="imgUrl"></image>
				<view
					:class="['count', isCanAddCart ? '' : 'gray-count']"
					v-if="isCanAddCart && info.cartNum > 0"
					>{{ info.cartNum > 99 ? "99+" : info.cartNum }}</view
				>
			</view>
		</view>
	</view>
</template>

<script>
import formatePrice from "@/mixins/formatePrice";
export default {
	name: "grain-item",
	mixins: [formatePrice],
	props: {
		isTitle: {
			default: false,
			type: Boolean,
		},
		info: {
			default: function() {},
			type: Object,
		},
	},
	data() {
		return {};
	},
	computed: {
		itemStyle() {
			if (this.isTitle) return "font-size:26rpx;color:#666";
			return "font-size:32rpx;color:#666";
		},
		nameStyle() {
			if (this.isTitle) return "";
			return "font-weight:bold;";
		},
		specStyle() {
			if (this.isTitle) return "";
			return "font-size:28rpx";
		},
		marketStyle() {
			if (this.isTitle) return "";
			return "color:#363534";
		},
		imgUrl() {
			if (this.isTitle) return "";
			if (this.isCanAddCart)
				return "/static/images/grain/cart-active.png";
			return "/static/images/grain/cart.png";
		},
		isCanAddCart() {
			const obj = this.info;
			if (this.isTitle) return false;
			const stockAmount = obj.stockAmount || 0,
				packageNum = obj.packageNum || 1;
			const n = stockAmount / packageNum;
			if (n > 1) return true;
			return false;
		},
	},
	methods: {
		async addGoodsCart() {
			const customerId = uni.getStorageSync("customerId");
			if (this.isTitle) return;
			if (!this.isCanAddCart) {
				uni.showToast({
					title: "库存不足",
					icon: "error",
				});
				return;
			}
			const { id, storeId, skuId, skuPriceId, packageNum, price } =
				this.info;
			const res = await this.$myRequest({
				method: "POST",
				url: "/goods/cart/saveCart",
				data: {
					goodsId: id,
					storeId: storeId,
					skuId: skuId,
					amount: packageNum || 1,
					skuPriceId: skuPriceId,
					price: price,
					customerId: customerId,
				},
			});
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			const v = packageNum || 1;
			this.info.cartNum += v;
			this.info.stockAmount -= v;
			this.$emit("addCart", this.info);
		},
		goDetail() {
			const obj = this.info;
			if (this.isTitle) return;
			const url = `/pages/grain/grainDetail?goodsId=${obj.id}&storeId=${
				obj.storeId
			}&type=${1}`;
			uni.navigateTo({
				url,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.item-wrap {
	padding: 0 30rpx;
	height: 120rpx;
	background-color: #fff;
	padding-right: 60rpx;
	.item {
		border-bottom: 1rpx solid #eee;
		height: 100%;
		.name {
			width: 220rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			margin-right: 20rpx;
		}
		.buy-price {
			color: #333;
			font-weight: bold;
			text-align: center;
			width: 120rpx;
		}

		.cart {
			position: relative;
			left: -10rpx;
			top:6rpx;
			image {
				width: 47rpx;
				height: 45rpx;
			}
			.count {
				position: absolute;
				top: -4rpx;
				left: 16rpx;

				height: 30rpx;
				line-height: 30rpx;
				padding: 0 8rpx;
				background: #ff7247;
				border-radius: 20rpx;

				font-size: 18rpx;

				color: #ffffff;
				transform: translateX(-90%);
			}
		}
		.gray-count {
			background-color: #bbb;
		}
	}
}
</style>
