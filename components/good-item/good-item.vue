<template>
	<view class="goods-item flex">
		<image
			class="goodsTag"
			:style="tagImgStyle"
			:src="tagImg"
			mode=""
		></image>
		<image
			:src="info.thumbnailUrl || '/static/images/no-img-small.png'"
			@tap.stop="goDetail(false)"
			class="goods-img"
			mode="aspectFit"
		></image>
		<view class="goods-info" @tap.stop="goDetail(false)">
			<view class="name" v-if="source === 'store'"
				>{{ info.goodsName }}
			</view>
			<view class="name" v-else
				>{{ info.brandName }}|{{ info.goodsName }}</view
			>
			<view class="store">{{
				source === "store" ? info.brandName : info.storeName
			}}</view>

			<view class="price"
				>{{
					quaInfo && quaInfo.buyerQualificationStatus === 0
						? "¥ " + info.priceRange
						: "认证后查看价格"
				}}
			</view>
		</view>
		<view
			v-if="
				quaInfo &&
				quaInfo.buyerQualificationStatus === 0 &&
				!isHideApplyBtn
			"
			class="btn flex-center-center"
			:class="{ doing: itemState === 1, pass: itemState === 2 }"
			@click="goNext"
		>
			{{
				itemState === 1
					? "授权中"
					: itemState === 2
					? "立即购买"
					: "申请授权"
			}}
		</view>
	</view>
</template>

<script>
import { mapState } from "vuex";
import { setGoodsTagImg } from "@/libs/tool";
export default {
	name: "good-item",
	props: {
		info: {
			default: {},
			type: Object,
		},
		// 0 未授权，1 授权中，2已授权
		itemState: {
			default: 0,
			type: Number,
		},
		// 该条数据在数组中的索引
		infoIdx: {
			default: 0,
			type: Number,
		},
		// 该条数据所属的分类id
		classIdx: {
			default: 0,
			type: Number,
		},
		// 数据来源，店铺store还是列表
		source: {
			default: "",
			type: String,
		},
		// 是否隐藏授权按钮
		isHideApplyBtn: {
			default: false,
			type: Boolean,
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapState({
			quaInfo: (state) => state.certification.info,
		}),
		tagImg() {
			const v = this.info.tag;
			return setGoodsTagImg(v);
		},
		tagImgStyle() {
			const v = this.info.tag;
			return v === 1
				? "width:47rpx;height:53rpx;border-radius: 0;top:14rpx"
				: "width:60rpx;height:40rpx;border-radius: 0";
		},
	},
	mounted() {
		// this.quaInfo = uni.getStorageSync("qualificationInfo");
	},
	methods: {
		goNext() {
			const v = this.itemState;
			if (v === 0) {
				this.applyAuth();
				return;
			}
			if (v === 2) {
				this.goDetail(true);
			}
		},
		goDetail(flag) {
			const obj = this.info;
			const isBuyImmediately = flag ? true : false;
			const url = `/pages/index/goodsDetail?goodsId=${obj.id}&storeId=${obj.storeId}&isBuyImmediately=${isBuyImmediately}`;
			uni.navigateTo({
				url,
			});
		},
		async applyAuth() {
			const obj = this.info;
			const customerId = uni.getStorageSync("customerId");
			uni.showLoading({
				title: "加载中",
			});
			const res = await this.$myRequest({
				url: "/goods/goods/goodsAuthorize",
				data: {
					goodsId: obj.id,
					storeId: obj.storeId,
					customerId: customerId,
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
				title: "申请成功，待审核",
				icon: "none",
				complete: () => {
					this.$emit("applyAuth", {
						index: this.infoIdx,
						classIndex: this.classIdx,
					});
				},
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.goods-item {
	position: relative;
	padding: 30rpx 0 0;
	.goodsTag {
		position: absolute;
		left: 0rpx;
		top: 30rpx;
		z-index: 99;
	}
	.goods-info {
		flex: 1;
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid rgba(223, 223, 223, 0.46);
	}

	.goods-img {
		margin-right: 20rpx;
		width: 116rpx;
		height: 116rpx;
		border: 1rpx solid rgba(223, 223, 223, 0.46);
		border-radius: 5rpx;
	}

	.name {
		margin-bottom: 5rpx;
		font-size: 30rpx;
		color: #333;
	}

	.store {
		margin-bottom: 10rpx;
		font-size: 24rpx;
		color: #666;
	}

	.price {
		font-size: 30rpx;
		color: #ff5d2b;
		font-weight: bold;
		font-family: PingFang SC, PingFang SC-Bold;
	}

	.btn {
		position: absolute;
		right: 0;
		bottom: 35rpx;
		width: 160rpx;
		height: 60rpx;
		background: linear-gradient(128deg, #38d39e 0%, #1cb7ff 100%);
		border-radius: 30rpx;
		font-size: 28rpx;
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
</style>
