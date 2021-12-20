<template>
	<view class="content page-height">
		<view class="nav-list flex-between-center">
			<view
				class="nav-item column flex-center-center"
				:class="{ active: navIdx === index }"
				v-for="(nav, index) in navList"
				:key="index"
				@click="handleChange(index)"
			>
				<text class="label">{{ nav.label }}</text>
				<text class="border"></text>
			</view>
		</view>
		<template v-if="list && list.length">
			<view class="goods-list">
				<block v-for="(item, index) in list" :key="index">
					<view class="goods-list-item">
						<view class="select-wrap" v-if="navIdx === 0">
							<image
								:src="
									item.isSelected
										? '/static/images/cart/circle-active.png'
										: '/static/images/cart/circle.png'
								"
								class="circle-icon"
								@tap="selectItemGood(item)"
							></image>
						</view>
						<view class="app-f-f1">
							<good-item
								:infoIdx="index"
								:itemState="navIdx"
								:info="item"
								@applyAuth="applyAuth"
								:isHideApplyBtn="navIdx === 0"
							></good-item>
						</view>
					</view>
				</block>
			</view>
			<view class="footer flex-between-center" v-if="navIdx === 0">
				<view
					class="footer-left flex-start-center"
					@tap="selectAllGoods"
				>
					<image
						:src="
							isSelectedAll
								? '/static/images/cart/circle-active.png'
								: '/static/images/cart/circle.png'
						"
						class="circle-icon"
					>
					</image>
					<text>全部全选</text>
				</view>
				<view class="footer-right flex-start-center">
					<view
						class="submit-btn flex-center-center"
						@tap="applyAuthMore"
						:style="{ opacity: hasSelectedGood ? '1' : '0.6' }"
						>申请授权</view
					>
				</view>
			</view>
		</template>

		<template v-else>
			<view class="no-data column flex-center-center">
				<image src="/static/images/index/search.png"></image>
				<text>暂无商品</text>
			</view>
		</template>
		<view v-if="list && list.length > 9">
			<uni-load-more :status="moreStatus"></uni-load-more>
		</view>
		<view
			class="loading-modal"
			v-if="showFullLoading"
			@touchmove.stop.prevent="() => {}"
		>
		</view>
	</view>
</template>

<script>
import moreListMixin from "@/mixins/moreList";
import { BASEURL } from "@/libs/request";
export default {
	mixins: [moreListMixin],
	data() {
		return {
			navList: [
				{
					label: "未授权",
					value: 0,
				},
				{
					label: "授权中",
					value: 1,
				},
				{
					label: "已授权",
					value: 2,
				},
			],
			navIdx: 0,
			list: [],
			pageNum: 1,
			timer: null,
			moreStatus: "more",

			showFullLoading: false,
		};
	},
	components: {},
	onLoad() {
		this.getAuthingList();
		// this.getAllUnauthList();
	},
	onReachBottom() {
		this.getMoreList();
	},

	computed: {
		hasSelectedGood() {
			const list = this.list || [];
			if (list.length === 0) return false;
			return list.some((item) => item.isSelected);
		},
		isSelectedAll() {
			const list = this.list;
			if (!list || list.length === 0) return false;
			return list.every((item) => item.isSelected);
		},
	},
	onBackPress(e) {
		if (e.from === "backbutton") {
			uni.hideLoading();
			this.showFullLoading = false;
		}
		return false;
	},
	methods: {
		handleChange(index) {
			if (this.showFullLoading) return;
			this.navIdx = index;
			this.list = [];
			this.pageNum = 1;
			this.moreStatus = "more";

			if (index > 0) {
				this.getAuthList();
			} else {
				this.getAuthingList();
			}
		},
		async getAuthingList(hideLoading) {
			if (!hideLoading) {
				this.startShowLoading();
			}
			const id = uni.getStorageSync("customerId");
			const obj = {
				pageSize: 10,
				pageNum: this.pageNum,
			};
			if (id) {
				obj.customerId = id;
			}
			const res = await this.$myRequest({
				url: "/goods/goods/unauthorizedGoodsList",
				data: obj,
			});
			this.endHideLoading();
			this.timer = null;
			if (res.success !== 1) {
				this.showFullLoading = false;
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			let list = res.data.list;
			this.initPageNum(list);
			list = list && list.length ? list : [];
			const total = hideLoading ? 0 : this.list.length;
			const num = total % 10;
			if (num > 0) {
				list.splice(0, num);
			}
			if (list.length) {
				list.forEach((item) => {
					item.isSelected = false;
				});
			}
			this.list = hideLoading ? [...list] : [...this.list, ...list];
			this.showFullLoading = false;
		},
		async getAuthList() {
			this.startShowLoading();
			const v = this.navList[this.navIdx].value;
			const id = uni.getStorageSync("customerId");
			const obj = {
				pageNum: this.pageNum,
				pageSize: 10,
			};
			if (id) {
				obj.customerId = id;
			}
			if (v > 0) {
				obj.state = v - 1;
			}

			const res = await this.$myRequest({
				url: "/goods/goods/myGoodsList",
				data: obj,
			});
			this.endHideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			let list = res.data.list;
			this.initTimer();
			this.initPageNum(list);
			const total = this.list.length;
			const num = total % 10;
			if (num > 0) {
				list.splice(0, num);
			}
			list = list && list.length ? list : [];
			this.list = [...this.list, ...list];
		},
		getMoreList() {
			if (this.timer) return;
			this.timer = setTimeout(() => {
				this.pageNum++;
				this.moreStatus = "loading";
				if (this.navIdx === 0) {
					this.getAuthingList();
				} else {
					this.getAuthList();
				}
			}, 270);
		},
		applyAuth({ index }) {
			this.list.splice(index, 1);
		},
		selectItemGood(item) {
			if (this.showFullLoading) return;
			item.isSelected = !item.isSelected;
		},
		selectAllGoods() {
			if (this.showFullLoading) return;
			if (this.isSelectedAll) {
				this.list.forEach((item) => {
					item.isSelected = false;
				});
			} else {
				this.getAllUnauthList();
			}
		},
		applyAuthMore() {
			if (!this.hasSelectedGood) return;
			uni.showLoading({
				title: "加载中",
			});
			this.showFullLoading = true;
			const id = uni.getStorageSync("customerId");
			const obj = {
				isAll: !!this.isSelectedAll,
			};
			if (id) {
				obj.customerId = id;
			}
			const list = [];
			this.list.forEach((item) => {
				if (item.isSelected) {
					list.push({
						goodsId: item.id,
						storeId: item.storeId,
					});
				}
			});
			obj.storeGoodsList = list;

			const token = uni.getStorageSync("token") || "";
			uni.request({
				url: BASEURL + "/goods/goods/batchGoodsAuthorize",
				header: {
					Authorization: token,
					requestType: 0,
				},
				timeout: 600000,
				data: obj,
				method: "POST",
			}).then((res) => {
				if (!res[1]) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: "网络未连接",
						icon: "none",
					});
					return;
				}
				if (!res[1].data) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: "系统错误",
						icon: "none",
					});
					return;
				}
				if (
					res[1].data.success === 1001 ||
					res[1].data.success === 1002
				) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.removeStorageSync("userInfo");
					uni.removeStorageSync("token");
					uni.showToast({
						title: res[1].data.msg,
						icon: "none",
						duration: 2000,
						complete: () => {
							uni.reLaunch({
								url: "/pages/login/login",
							});
						},
					});
					return;
				}

				if (res[1].data.success !== 1) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
					return;
				}

				uni.showToast({
					title: "申请授权成功",
					duration: 2000,
					icon: "none",
					complete: () => {
						setTimeout(() => {
							if (!this.isSelectedAll) {
								this.pageNum = 1;
								this.getAuthingList(true);
							} else {
								this.list = [];
								this.showFullLoading = false;
							}
						}, 1500);
					},
				});
			});
		},
		async getAllUnauthList() {
			const id = uni.getStorageSync("customerId");
			const obj = {};
			if (id) {
				obj.customerId = id;
			}
			const token = uni.getStorageSync("token") || "";
			uni.showLoading({
				title: "加载中",
			});
			this.showFullLoading = true;
			uni.request({
				url: BASEURL + "/goods/goods/unauthorizedGoodsAllList",
				header: {
					Authorization: token,
					requestType: 0,
				},
				timeout: 600000,
				data: obj,
			}).then((res) => {
				if (!res[1]) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: "网络未连接",
						icon: "none",
					});
					return;
				}
				if (!res[1].data) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: "系统错误",
						icon: "none",
					});
					return;
				}
				if (
					res[1].data.success === 1001 ||
					res[1].data.success === 1002
				) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.removeStorageSync("userInfo");
					uni.removeStorageSync("token");
					uni.showToast({
						title: res[1].data.msg,
						icon: "none",
						duration: 2000,
						complete: () => {
							uni.reLaunch({
								url: "/pages/login/login",
							});
						},
					});
					return;
				}

				if (res[1].data.success !== 1) {
					this.showFullLoading = false;
					uni.hideLoading();
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
					return;
				}
				// console.log(JSON.stringify(res));
				const list = res[1].data.data || [];
				list.forEach((item) => {
					item.isSelected = true;
				});
				const len = list.length;
				if (len % 10 === 0) {
					this.pageNum = Math.floor(list.length / 10);
				} else {
					this.pageNum = Math.floor(list.length / 10) + 1;
				}
				this.moreStatus = "noMore";
				this.list = list;
				uni.hideLoading();
				uni.showToast({
					title: "已全选",
					icon: "none",
					complete: () => {
						this.showFullLoading = false;
					},
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding-top: 88rpx;
	background: #fff;
	padding-bottom: 120rpx;
	padding-bottom: calc(120rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(120rpx + env(safe-area-inset-bottom));
}

.nav-list {
	position: fixed;
	left: var(--window-left);
	right: var(--window-right);
	top: 0;
	top: constant(safe-area-inset-top);
	top: env(safe-area-inset-top);
	height: 88rpx;
	background: #fff;
	box-shadow: 0rpx 5rpx 8rpx 0rpx rgba(219, 219, 219, 0.75);
	z-index: 999;

	.nav-item {
		position: relative;
		flex: 1;
		height: 100%;
		font-size: 28rpx;
		color: #333;

		.border {
			position: absolute;
			left: 50%;
			bottom: 0;
			transform: translateX(-50%);
			display: block;
			margin-top: 10rpx;
			width: 50rpx;
			height: 5rpx;
			background-color: #ff5d2b;
			opacity: 0;
		}

		&.active {
			font-size: 32rpx;

			.border {
				opacity: 1;
			}
		}
	}
}

.goods-list {
	padding: 0 30rpx;

	.goods-list-item {
		display: flex;
		.select-wrap {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			image {
				height: 36rpx;
				width: 36rpx;
			}
		}
	}
}
.footer {
	padding: 30rpx 30rpx;

	font-size: 32rpx;
	color: #333333;
	background: #fff;
	padding-bottom: calc(30rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
	position: fixed;
	bottom: 0;
	width: 750rpx;
	z-index: 999;
	border-top: 1rpx solid #d7d7d7;
	.circle-icon {
		margin-right: 20rpx;
		width: 36rpx;
		height: 36rpx;
	}

	.total {
		color: #ff5d2b;
		font-size: 32rpx;
		font-weight: bold;
	}

	.submit-btn {
		margin-left: 30rpx;
		width: 160rpx;
		height: 60rpx;
		color: #ffffff;
		background: #ff7247;
		border-radius: 30rpx;
		font-size: 28rpx;
	}
}
.loading-modal {
	height: 100vh;
	width: 100vw;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	color: #fff;
	font-size: 50rpx;
}
</style>
