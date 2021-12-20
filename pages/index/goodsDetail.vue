<template>
	<view class="content" v-if="goodsDetail">
		<view
			style="
				position: fixed;
				width: 750rpx;
				height: var(--status-bar-height);
				top: 0;
				z-index: 999;
				background-color: #fff;
			"
		></view>
		<image
			src="/static/images/back.png"
			class="back-btn"
			@click.stop="handleBack"
		></image>
		<view class="swiper-wrap">
			<swiper
				:indicator-dots="true"
				class="swiper-wrap"
				:autoplay="true"
				:interval="3000"
				:duration="1000"
				indicator-color="#D4D4D4"
				indicator-active-color="#ff7e59"
			>
				<swiper-item
					v-for="(banner, index) in goodsDetail.goodsBannerList"
					:key="index"
				>
					<view
						class="swiper-item flex-center-center"
						style="height: 100%"
					>
						<image
							:src="banner.url || '/static/images/no-img-big.png'"
							style="height: 750rpx; width: 750rpx"
						></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view
			class="goods-price"
			v-if="quaInfo && quaInfo.buyerQualificationStatus === 0"
		>
			<text>¥ </text>{{ goodsDetail.goods.priceRange }}
		</view>

		<view class="goods-price" v-else>
			<text
				style="
					font-size: 30rpx;
					background: #fff3ef;
					padding: 10rpx 15rpx;
					border-radius: 10rpx;
				"
			>
				认证后查看价格
			</text>
		</view>
		<view class="goods-name"
			>{{ goodsDetail.goods.brandName }} |
			{{ goodsDetail.goods.goodsName }}</view
		>
		<view
			class="store-info"
			@click="
				handleDetail(
					'/pages/store/index?storeId=' + goodsDetail.store.id
				)
			"
		>
			<view class="info-up flex">
				<image
					:src="goodsDetail.store.logoUrl"
					class="store-img"
				></image>
				<view class="" style="flex: 1">
					<view class="store-name">{{ goodsDetail.store.name }}</view>
					<view
						class="store-intro"
						v-if="goodsDetail.store.startAmount"
						>起批金额{{ goodsDetail.store.startAmount }}</view
					>
					<view class="store-intro">{{
						goodsDetail.store.explain
					}}</view>
				</view>
			</view>
			<view class="info-down flex-start-center">
				<view class="item flex-center-center"
					>全部商品<text class="strong">{{
						goodsDetail.goodsTotal
					}}</text></view
				>
				<view class="item flex-center-center"
					>已授权商品<text class="strong">{{
						goodsDetail.goodsAuthorTotal
					}}</text>
				</view>
			</view>
		</view>
		<view class="explain">
			<text decode>说明：\n{{ goodsDetail.store.buyInstructions }}</text>
		</view>
		<view
			class="base-info-wrap"
			v-if="goodsDetail.goodsInfoList.length != 0"
		>
			<view class="title-label">基本信息</view>
			<view class="base-info">
				<view
					class="base-info-item flex"
					v-for="(info, index) in goodsDetail.goodsInfoList"
					:key="index"
				>
					<text class="label">{{ info.title }}</text>
					<text style="flex: 1">{{ info.content }}</text>
				</view>
			</view>
		</view>
		<view class="goods-img">
			<image
				:src="img"
				mode="widthFix"
				v-for="(img, index) in imgList"
				:key="index"
			></image>
		</view>
		<view style="height: 150rpx"></view>
		<!-- 未认证提示 -->
		<authTips v-if="!quaInfo || quaInfo.buyerQualificationStatus !== 0">
		</authTips>

		<view
			class="footer fixed-bottom"
			v-else
			style="
				bottom: 0;
				padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
				padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
			"
		>
			<view
				class="flex-between-center"
				v-if="
					goodsDetail.goods.authorizeStatus === keyMap.authStatus.pass
				"
			>
				<view class="cart column flex-center-center" @click="advisory">
					<image src="/static/images/service.png"></image>
					<text>在线客服</text>
				</view>
				<view class="cart column flex-center-center" @click="goCart">
					<view class="cart-icon" style="position: relative">
						<image src="/static/images/cart_icon2.png"></image>
						<view class="cart-total" v-if="cartTotal > 0">
							{{ cartTotal > 99 ? 99 : cartTotal }}
						</view>
					</view>
					<text>购物车</text>
				</view>
				<view class="btn-wrap flex-start-center">
					<view
						class="btn flex-center-center"
						@click="handleOpenGoods('add')"
						>加入购物车</view
					>
					<view
						class="btn active flex-center-center"
						@click="handleOpenGoods('buy')"
						>立即购买</view
					>
				</view>
			</view>
			<view
				class="submit-btn doing flex-center-center"
				v-else-if="
					goodsDetail.goods.authorizeStatus ===
					keyMap.authStatus.doing
				"
				@click.stop="handleAuth"
				style="position: relative !important"
				>授权中</view
			>
			<view
				class="submit-btn flex-center-center"
				v-else
				@click.stop="handleAuth"
				style="position: relative !important"
				>申请授权</view
			>
		</view>
		<uni-popup ref="popup" type="bottom">
			<scroll-view class="popup-goods" scroll-y="true">
				<view class="close-wrap" @click="$refs.popup.close()">
					<image
						src="/static/images/cart/close.png"
						class="close-icon"
						mode="aspectFit"
					></image>
				</view>
				<view class="goods-info flex">
					<image
						:src="
							goodsDetail.goodsSkuList[skuIdx]
								? goodsDetail.goodsSkuList[skuIdx].imgUrl
								: ''
						"
						class="goods-img"
					></image>
					<view class="info">
						<view class="price"
							><text>¥</text
							>{{
								(goodsDetail.goodsSkuList[skuIdx]
									? goodsDetail.goodsSkuList[skuIdx]
											.purchasePrice == 0
										? "****"
										: goodsDetail.goodsSkuList[skuIdx]
												.purchasePrice
									: "****") | formatePrice
							}}</view
						>
						<text
							>库存{{
								goodsDetail.goodsSkuList[skuIdx]
									? goodsDetail.goodsSkuList[skuIdx]
											.stockAmount > 500
										? "充足"
										: goodsDetail.goodsSkuList[skuIdx]
												.stockAmount > 0
										? "预警"
										: "不足"
									: "不足"
							}}</text
						>
					</view>
				</view>
				<view class="label">选择规格</view>
				<view
					class="sku-item flex-start-center"
					:class="{
						active: skuIdx === index,
						disabled: sku.stockAmount <= 0,
					}"
					v-for="(sku, index) in goodsDetail.goodsSkuList"
					:key="index"
					@click="
						sku.stockAmount <= 0 ? '' : handleChangeSku(sku, index)
					"
				>
					<image
						src="/static/images/gou.png"
						v-if="skuIdx === index"
					></image>
					<text decode
						>{{ sku.skuName }}&nbsp;&nbsp;{{
							sku.packageNum || 9999
						}}盒起批</text
					>
				</view>
				<view class="amount flex-between-center">
					<text class="label">数量</text>
					<view class="input-wrap flex-start-center">
						<view
							class="minus btn flex-center-center"
							@click.stop="handleAmount('minus')"
						>
							<image
								src="/static/images/cart/minus.png"
								mode="aspectFit"
							></image>
						</view>
						<input
							type="number"
							v-model="amount"
							@blur="inputCount"
						/>
						<view
							class="plus btn flex-center-center"
							@click.stop="handleAmount('add')"
						>
							<image
								src="/static/images/cart/plus.png"
								mode="aspectFit"
							></image>
						</view>
					</view>
				</view>
				<view
					class="submit-btn pass flex-center-center"
					v-if="type === 'add'"
					:style="
						'opacity:' +
						(goodsDetail.goodsSkuList[skuIdx] &&
						goodsDetail.goodsSkuList[skuIdx].stockAmount > 0
							? '1'
							: '0.6')
					"
					@click="handleAddCart"
					>{{
						goodsDetail.goodsSkuList[skuIdx] &&
						goodsDetail.goodsSkuList[skuIdx].stockAmount > 0
							? "加入购物车"
							: "库存不足"
					}}</view
				>
				<view
					class="submit-btn pass flex-center-center"
					v-else
					:style="
						'opacity:' +
						(goodsDetail.goodsSkuList[skuIdx] &&
						goodsDetail.goodsSkuList[skuIdx].stockAmount > 0
							? '1'
							: '0.6')
					"
					@click="submitOrder"
					>{{
						goodsDetail.goodsSkuList[skuIdx] &&
						goodsDetail.goodsSkuList[skuIdx].stockAmount > 0
							? "立即购买"
							: "库存不足"
					}}</view
				>
			</scroll-view>
			<view style="height: 50rpx; background-color: #fff"></view>
		</uni-popup>
	</view>
</template>

<script>
import authTips from "@/components/authTips.vue";
import { goodsAuth } from "@/libs/tool.js";
import { mapState } from "vuex";
import { goPage } from "@/libs/tool";
import formatePrice from "@/mixins/formatePrice";
export default {
	mixins: [formatePrice],
	data() {
		return {
			type: "",
			skuIdx: 0,
			amount: 0,
			imgList: [],
			storeId: null,
			goodsId: null,
			cartTotal: null,
			goodsDetail: null,
		};
	},
	components: {
		authTips,
	},
	computed: {
		...mapState({
			quaInfo: (state) => state.certification.info,
		}),
	},
	onLoad(options) {
		this.goodsId = options.goodsId;
		this.storeId = options.storeId;
		this.getGoodsDetail();
		setTimeout(() => {
			if (options.isBuyImmediately === "true") {
				this.type = "buy";
				this.amount = this.goodsDetail.goodsSkuList[this.skuIdx]
					? this.goodsDetail.goodsSkuList[this.skuIdx].packageNum
					: 9999;
				this.$refs.popup.open("bottom");
			}
		}, 1500);
	},
	onShow() {
		this.cartTotal = uni.getStorageSync("cartTotal");
		this.$nextTick(() => {
			uni.onKeyboardHeightChange((res) => {
				if (res.height === 0) {
					const data = this.goodsDetail.goodsSkuList[this.skuIdx];
					const min = data.packageNum || 9999;
					const max = data.stockAmount || 0;
					if (this.amount < min) {
						this.amount = min;
						uni.showToast({
							title: "以按商品起批为您调整",
							icon: "none",
						});
					} else if (this.amount > max) {
						this.amount = max;
						uni.showToast({
							title: "超出商品可购数量",
							icon: "none",
						});
					}
				}
			});
		});
	},
	onHide() {
		uni.offKeyboardHeightChange(callback);
	},
	methods: {
		/**
		 * 立即购买提交
		 */
		submitOrder() {
			let userInfo = uni.getStorageSync("userInfo");
			if (userInfo.buyerQualificationStatus !== 0)
				return uni.showToast({ title: "采购资质异常", icon: "none" });
			if (userInfo.status == 1)
				return uni.showToast({ title: "客户已被停用", icon: "none" });
			const data = this.goodsDetail.goodsSkuList[this.skuIdx];
			if (!data) return;
			let orderFormList = [
				{
					skuPriceId: data.skuPriceId,
					storeId: this.storeId,
					priceId: this.priceId,
					storeName: this.goodsDetail.store.name,
					totalAmount: this.amount,
					totalPrices: this.amount * data.purchasePrice,
					goodsId: this.goodsId,
					skuData: data,
					goodsList: [],
					logoUrl: this.goodsDetail.store.logoUrl,
				},
			];
			orderFormList[0].goodsList.push(this.goodsDetail.goods);
			orderFormList[0].goodsList[0].price =
				this.goodsDetail.goodsSkuList[this.skuIdx].purchasePrice;
			orderFormList[0].goodsList[0].skuImgUrl =
				this.goodsDetail.goodsSkuList[this.skuIdx].imgUrl;
			uni.setStorageSync("orderInfo", orderFormList);
			this.handleDetail("/pages/cart/order?sourceType=0");
		},
		getGoodsDetail() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/goods/goodsDetail",
				data: {
					goodsId: this.goodsId,
					storeId: this.storeId,
					customerId: customerId,
				},
			}).then((res) => {
				if (res.success === 1) {
					this.goodsDetail = res.data;
					if (
						this.goodsDetail &&
						this.goodsDetail.goods &&
						this.goodsDetail.goods.describes
					) {
						this.imgList =
							this.goodsDetail.goods.describes.split(",");
					}
					const data = this.goodsDetail.goodsSkuList[this.skuIdx];
					this.amount = data ? data.packageNum : 9999;
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
		handleChangeSku(sku, index) {
			this.skuIdx = index;
			this.amount = sku ? sku.packageNum : 9999;
		},
		/**
		 * 跳转子页面
		 * @param {Object} url 页面路径
		 */
		handleDetail(url) {
			uni.navigateTo({
				url,
			});
		},
		handleOpenGoods(type) {
			this.type = type;
			const data = this.goodsDetail.goodsSkuList[this.skuIdx];
			this.amount = data ? data.packageNum : 9999;
			this.$refs.popup.open("bottom");
		},
		/**
		 * 商品授权
		 */
		handleAuth() {
			if (
				this.goodsDetail.goods.authorizeStatus ===
				this.keyMap.authStatus.doing
			)
				return;
			goodsAuth(this.goodsDetail.goods).then((res) => {
				if (res === "success") {
					this.goodsDetail.goods.authorizeStatus =
						this.keyMap.authStatus.doing;
				}
			});
		},
		handleAmount(type) {
			const data = this.goodsDetail.goodsSkuList[this.skuIdx];
			if (type === "minus") {
				const min = data ? data.packageNum : 9999;
				if (this.amount > min) {
					this.amount = +this.amount - 1;
				}
			} else {
				const max = data ? data.stockAmount : 0;
				if (this.amount < max) {
					this.amount = +this.amount + 1;
				}
			}
		},
		/**
		 * 加入购物车
		 */
		handleAddCart() {
			const data = this.goodsDetail.goodsSkuList[this.skuIdx];
			const customerId = uni.getStorageSync("customerId");
			if (!data) return;
			const packageNum = data.packageNum;
			const stockAmount = data.stockAmount;
			if (+this.amount > stockAmount) {
				uni.showToast({
					title: `当前商品库存为${stockAmount}`,
					icon: "none",
					duration: 2000,
				});
				return;
			}
			if (+this.amount < packageNum) {
				uni.showToast({
					title: `当前商品起购量为${stockAmount}`,
					icon: "none",
					duration: 2000,
				});
				return;
			}
			this.$myRequest({
				method: "POST",
				url: "/goods/cart/saveCart",
				data: {
					goodsId: this.goodsId,
					storeId: this.storeId,
					skuId: data.id,
					amount: this.amount,
					price: data.purchasePrice,
					skuPriceId: data.skuPriceId,
					customerId: customerId,
				},
			}).then((res) => {
				if (res.success === 1) {
					uni.showToast({
						title: "加入购物车成功",
						icon: "none",
						duration: 2000,
					});
					let timer = setTimeout(
						function () {
							this.getCartTotal();
						}.bind(this),
						1000
					);
				} else {
					uni.showToast({
						title: res.msg || "加入购物车失败",
						icon: "none",
						duration: 2500,
					});
				}
			});
		},
		handleBack() {
			uni.$emit("cartUpdate", {});
			uni.navigateBack({
				deta: 1,
			});
		},
		goCart() {
			uni.$emit("cartUpdate", {});
			uni.switchTab({
				url: "/pages/cart/index",
			});
		},
		// 客服
		advisory() {
			goPage("/pages/admin/service");
		},
		// 数量输入校验库存量
		inputCount() {
			if (this.goodsDetail.goodsSkuList[this.skuIdx].stockAmount) {
				if (
					this.amount >
					this.goodsDetail.goodsSkuList[this.skuIdx].stockAmount
				) {
					uni.showToast({
						title: "超出商品可购数量",
						icon: "none",
					});
					this.amount =
						this.goodsDetail.goodsSkuList[this.skuIdx].stockAmount;
				}
			}
		},
		getCartTotal() {
			const customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/cart/cartTotal?customerId=" + customerId,
			}).then((res) => {
				let data = res.data.total;
				this.cartTotal = data;
				uni.setStorageSync("cartTotal", data);
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	// padding-bottom: 100rpx;
	background: #fff;
	padding-top: var(--status-bar-height);
	// height: 100vh;
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
.back-btn {
	position: fixed;
	left: 30rpx;
	top: calc(var(--status-bar-height) + 30rpx);
	width: 56rpx;
	height: 56rpx;
	z-index: 10;
}
.swiper-wrap {
	width: 750rpx;
	height: 750rpx;
	background: #ececec;
	.top-swiper {
		height: 100%;
		width: 100%;
		.swiper-item {
			width: 100%;
			height: 100%;
			image {
				width: 750rpx;
				height: 750rpx;
			}
		}
	}
}

.goods-price {
	margin-top: 30rpx;
	padding: 0 30rpx;
	font-size: 42rpx;
	font-weight: bold;
	color: #ff5d2b;

	text {
		font-size: 30rpx;
	}
}

.goods-name {
	margin-top: 15rpx;
	padding: 0 30rpx;
	font-size: 36rpx;
	font-weight: bold;
	color: #333333;
}

.store-info {
	margin: 30rpx;
	padding: 0 20rpx;
	background: #f0f0f0;
	border-radius: 10rpx;

	.info-up {
		padding: 20rpx 0;
		border-bottom: 1rpx solid #d7d7d7;
	}

	.store-img {
		margin-right: 20rpx;
		width: 88rpx;
		height: 88rpx;
		border-radius: 10rpx;
	}

	.store-name {
		margin-bottom: 5rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.store-intro {
		color: #666666;
		line-height: 36rpx;
		font-size: 24rpx;
	}

	.item {
		flex: 1;
		padding: 20rpx 0 30rpx;
		color: #333;
		font-size: 24rpx;

		.strong {
			margin-left: 10rpx;
			color: #ff7532;
		}
	}
}

.explain {
	padding: 60rpx 30rpx;
	color: #666666;
	line-height: 45rpx;
	font-size: 30rpx;
}

.base-info-wrap {
	margin: 0 30rpx 40rpx;

	.title-label {
		margin-bottom: 20rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #333;
	}

	.base-info {
		border: 1rpx solid #d7d7d7;
		border-bottom: 0;

		.base-info-item {
			border-bottom: 1rpx solid #d7d7d7;
			.label {
				width: 100rpx;
				text-align: center;
				border-right: 1rpx solid #d7d7d7;
				font-size: 28rpx;
			}

			text {
				padding: 20rpx;
			}
		}
	}
}

.goods-img {
	image {
		width: 100%;
	}
}

.footer {
	padding: 20rpx 30rpx;
	font-size: 32rpx;
	color: #333333;
	background: #fff;
	.cart {
		position: relative;
		height: 100%;
		color: #333333;
		font-size: 20rpx;

		image {
			width: 42rpx;
			height: 42rpx;
		}

		.amount {
			right: -10rpx;
			top: 0;
			position: absolute;
			width: 43rpx;
			height: 32rpx;
			background: #ff5d2b;
			border-radius: 16rpx;
			font-size: 24rpx;
			color: #fff;
		}
	}

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
	.submit-btn {
		width: 100%;
		height: 88rpx;
		background: linear-gradient(128deg, #38d39e 0%, #1cb7ff 100%);
		border-radius: 45rpx;
		font-size: 30rpx;
		color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		&.pass {
			background: #ff7247;
		}
		&.doing {
			background: #ffe3da;
			color: #ff7247;
		}
	}
}

.popup-goods {
	position: relative;
	padding: 30rpx;
	border-radius: 20rpx 20rpx 0 0;
	background: #fff;
	max-height: 700rpx;
	.close-wrap {
		position: absolute;
		right: 0;
		top: 0;
		padding: 30rpx;
	}

	.close-icon {
		width: 17rpx;
		height: 17rpx;
	}

	.goods-info {
		margin-bottom: 50rpx;
	}

	.goods-img {
		margin-right: 30rpx;
		width: 110rpx;
		height: 110rpx;
		border-radius: 10rpx;
	}

	.price {
		margin-bottom: 10rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #ff5d2b;

		text {
			font-size: 30rpx;
		}
	}

	.info {
		flex: 1;
		font-size: 24rpx;
		color: #666;
	}

	.label {
		color: #333333;
		font-size: 32rpx;
	}

	.sku-item {
		margin-top: 30rpx;
		padding: 0 40rpx;
		width: 100%;
		height: 70rpx;
		background: #f3f3f3;
		border-radius: 35rpx;
		color: #333333;
		font-size: 30rpx;

		image {
			margin-right: 20rpx;
			width: 23rpx;
			height: 16rpx;
		}

		&.active {
			background: #ffe9e2;
			color: #ff7247;
		}

		&.disabled {
			background: #f3f3f3;
			color: #d7d7d7;
		}
	}

	.amount {
		margin-top: 50rpx;
	}

	.input-wrap {
		border: 1rpx solid #e9e9e9;
		border-radius: 10rpx;

		.btn {
			width: 51rpx;
			height: 66rpx;
		}

		image {
			width: 19rpx;
			height: 19rpx;
		}

		input {
			width: 110rpx;
			height: 66rpx;
			text-align: center;
			background: #f3f3f3;
			border-radius: 4rpx;
			color: #333333;
			font-size: 30rpx;
		}
	}

	.submit-btn {
		margin-top: 60rpx;
		width: 100%;
		height: 88rpx;
		background: linear-gradient(128deg, #38d39e 0%, #1cb7ff 100%);
		border-radius: 40rpx;
		font-size: 30rpx;
		color: #fff;
		&.pass {
			background: #ff7247;
		}
		&.doing {
			background: #ffe3da;
			color: #ff7247;
		}
	}
}
.cart-total {
	min-width: 30rpx;
	min-height: 30rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 30rpx;
	background-color: #ff0000;
	color: #ffffff;
	padding: 0 2rpx;
	position: absolute;
	top: -10rpx;
	left: 30rpx;
}
</style>
