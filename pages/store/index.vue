<template>
	<view class="content" :class="{ 'padding-top': navListFlag }">
		<view
			class="fixed-wrap"
			:class="{ 'white-bg': searchFlag }"
			@click="handleDetail('/pages/index/search?storeId=' + storeId)"
		>
			<my-search>
				<template v-slot:back>
					<view class="back-wrap flex-center-center">
						<image src="/static/images/arrow_left.png"></image>
					</view>
				</template>
			</my-search>
		</view>
		<view class="store-wrap">
			<view class="store-bg" v-if="storeDetail">
				<image
					:src="storeDetail.store.mapUrl"
					class="store-bg-img"
					mode="aspectFill"
				></image>
				<view class="masker"></view>
			</view>
			<view class="store-info-wrap flex" v-if="storeDetail">
				<image
					:src="storeDetail.store.logoUrl"
					class="store-img"
				></image>
				<view class="store-info">
					<view class="info-up flex-between-center">
						<text class="name">{{ storeDetail.store.name }}</text>
						<view
							class="flex-start-center"
							@click="$refs.explain.open()"
							><image
								src="/static/images/tips.png"
								class="tips-icon"
							></image
							>购买须知</view
						>
					</view>
					<view class="info-center"
						>起批金额{{ storeDetail.store.startAmount }}</view
					>
					<view class="info-center">{{
						storeDetail.store.explain
					}}</view>
					<view class="info-down flex-start-center">
						<view class="flex-start-center"
							>全部商品<text
								class="strong"
								style="margin-left: 12rpx"
							>
								{{ storeDetail.goodsTotal }}</text
							></view
						>
						<text class="border"></text>
						<view class="flex-start-center"
							>已授权商品<text
								class="strong"
								style="margin-left: 12rpx"
							>
								{{ storeDetail.goodsAuthorTotal }}</text
							></view
						>
					</view>
				</view>
			</view>
		</view>
		<view v-if="storeDetail">
			<!-- 单个商品 -->
			<view
				style="padding-bottom: 150rpx"
				v-if="storeDetail.store.showModel === keyMap.showModel.single"
			>
				<view
					class="single-goods-wrap"
					v-for="(goods, index) in goodsList"
					:key="index"
					@click="
						handleDetail(
							'/pages/index/goodsDetail?goodsId=' +
								goods.id +
								'&storeId=' +
								storeId
						)
					"
				>
					<view style="position: relative">
						<image
							:src="
								goods.thumbnailUrl ||
								'/static/images/no-img-big.png'
							"
							class="goods-img"
							mode="aspectFit"
						></image>
						<image
							:style="
								goods.tag === 1
									? 'position:absolute;left:0;top:0;width:64rpx;height:72rpx;'
									: goods.tag === 0
									? 'position:absolute;left:0;top:0;width:83rpx;height:56rpx;'
									: 'position:absolute;left:0;top:0;width:80rpx;height:53rpx;'
							"
							:src="goods.tagImg"
						></image>
					</view>

					<view class="single-goods">
						<view class="goods-name"
							>{{ goods.brandName }} | {{ goods.goodsName }}</view
						>
						<view class="goods-price flex-between-center">
							<view class="price"
								><text></text
								>{{
									quaInfo &&
									quaInfo.buyerQualificationStatus === 0
										? "¥ " + goods.priceRange
										: "认证后查看价格"
								}}</view
							>
							<view
								class="btn flex-center-center"
								:class="{
									doing:
										goods.authorizeStatus ===
										keyMap.authStatus.doing,
									pass:
										goods.authorizeStatus ===
										keyMap.authStatus.pass,
								}"
								@click.stop="handleAuth(goods, index)"
							>
								{{
									goods.authorizeStatus ===
									keyMap.authStatus.doing
										? "授权中"
										: goods.authorizeStatus ===
										  keyMap.authStatus.pass
										? "立即购买"
										: "申请授权"
								}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 商品列表 -->
			<view v-else>
				<scroll-view
					class="nav-list"
					:scroll-x="true"
					:class="{ fixed: navListFlag }"
					:scroll-into-view="navToId"
				>
					<view
						class="nav-item"
						:class="{ active: navIdx === index }"
						v-for="(nav, index) in navList"
						:key="index"
						@click="handleChangeNav(index)"
						:id="'nav-' + index"
					>
						<text class="label">{{ nav.name }}</text>
						<text class="border"></text>
					</view>
				</scroll-view>
				<view
					class="main flex"
					:class="{ 'padding-left': navListFlag }"
				>
					<view class="class-list" :class="{ fixed: navListFlag }">
						<view
							class="class-item"
							:class="{ active: classIdx === index }"
							v-for="(item, index) in classList"
							:key="index"
							@click="handleChangeClass(item, index)"
						>
							<view style="width: 100%; text-align: center">{{
								item.name.slice(0, 4)
							}}</view>
							<view style="width: 100%; text-align: center">{{
								item.name.slice(4)
							}}</view>
						</view>
					</view>
					<view class="goods-list-wrap">
						<block v-for="(item, index) in goodsList" :key="index">
							<template
								v-if="item.goodsList && item.goodsList.length"
							>
								<view
									class="goods-list"
									ref="goodsList"
									:id="'id' + item.id"
									:mid="'mid' + item.id"
								>
									<view class="title flex-start-center"
										><image
											src="/static/images/dot.png"
										></image
										>{{ item.classifyName }}</view
									>
									<block
										v-for="(goods, key) in item.goodsList"
										:key="key"
									>
										<good-item
											source="store"
											:info="goods"
											@applyAuth="applyAuth"
											:classIdx="index"
											:infoIdx="key"
											:itemState="goods.authorizeStatus"
										>
										</good-item>
									</block>
								</view>
							</template>
						</block>
					</view>
				</view>
			</view>
			<uni-popup ref="explain" type="center">
				<view class="explain">
					<view class="close-wrap" @click="$refs.explain.close()">
						<image
							src="/static/images/cart/close.png"
							class="close-icon"
							mode="aspectFit"
						></image>
					</view>
					<view class="title flex-center-center">购买须知</view>
					<text>{{ storeDetail.store.buyInstructions }}</text>
				</view>
			</uni-popup>
		</view>
		<!-- 未认证提示 -->
		<auth-tips></auth-tips>
	</view>
</template>

<script>
import authTips from "@/components/authTips.vue";
import { setGoodsTagImg } from "@/libs/tool.js";
import { mapState } from "vuex";
export default {
	data() {
		return {
			searchFlag: false,
			navListFlag: false,
			navList: [],
			navIdx: 0,
			classList: [],
			classIdx: 0,
			allLevelList: [],
			goodsList: [],
			searchHeight: 0,
			storeWrapHeight: 0,
			storeId: "",
			storeDetail: null,

			navToId: "",
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
		this.storeId = options.storeId;
		this.getStoreDetail();
	},
	onPageScroll(e) {
		// 头部搜索栏
		if (e.scrollTop >= this.searchHeight) {
			this.searchFlag = true;
		} else {
			this.searchFlag = false;
		}
		// 分类导航栏
		if (this.storeDetail.showModel === this.keyMap.showModel.class) {
			if (e.scrollTop >= this.storeWrapHeight) {
				this.navListFlag = true;
			} else {
				this.navListFlag = false;
			}
		}
	},
	methods: {
		getHeight() {
			const fixedWrap = uni.createSelectorQuery().select(".fixed-wrap");
			const storeWrap = uni.createSelectorQuery().select(".store-wrap");
			fixedWrap
				.boundingClientRect((rect1) => {
					this.searchHeight = rect1 ? rect1.height : 0;
				})
				.exec();
			storeWrap
				.boundingClientRect((rect2) => {
					this.storeWrapHeight = rect2 ? rect2.height : 0;
				})
				.exec();
		},
		// 获取详情
		getDetail(callBack) {
			const customerId = uni.getStorageSync("customerId");
			const obj = {
				storeId: this.storeId,
			};
			if (customerId) {
				obj.customerId = customerId;
			}
			this.$myRequest({
				method: "GET",
				url: "/goods/store/storeDetail",
				data: obj,
			}).then(callBack);
		},
		/**
		 * 获取店铺详情
		 */
		getStoreDetail() {
			this.getDetail((res) => {
				if (res.success === 1) {
					const data = res.data;
					this.storeDetail = data;
					data.store.showModel === this.keyMap.showModel.single
						? this.getStoreGoodsList()
						: this.getClassList();
					this.$nextTick(() => {
						this.getHeight();
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
		/**
		 * 获取商品分类列表
		 */
		getClassList() {
			this.$myRequest({
				method: "GET",
				url: "/goods/classify/list",
			}).then((res) => {
				if (res.success === 1) {
					this.allLevelList = res.data;
					this.navList = this.allLevelList.filter(
						(item) => item.level === 1
					);
					this.navList.unshift({
						name: "全部商品",
						level: "",
					});
					this.classList = this.allLevelList.filter(
						(item) =>
							item.level === 2 &&
							(!this.navList[this.navIdx].id ||
								item.parentId === this.navList[this.navIdx].id)
					);
					this.getGoodsList();
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
		getGoodsList() {
			const customerId = uni.getStorageSync("customerId");
			const obj = {
				classifyId: this.classList[this.classIdx].id,
				storeId: this.storeId,
			};
			if (customerId) {
				obj.customerId = customerId;
			}
			this.$myRequest({
				method: "GET",
				url: "/goods/goods/goodsListByClassify",
				data: obj,
			}).then((res) => {
				if (res.success === 1) {
					const data = res.data;
					data.forEach((item) => {
						// authorizeStatus
						item.goodsList.forEach((item1) => {
							if (
								item1.authorizeStatus === 0 ||
								item1.authorizeStatus === 1
							) {
								item1.authorizeStatus =
									item1.authorizeStatus + 1;
							} else {
								item1.authorizeStatus = 0;
							}
						});
					});
					this.goodsList = data;
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
		/**
		 * 获取店铺商品列表
		 */
		getStoreGoodsList() {
			const customerId = uni.getStorageSync("customerId");
			const obj = {
				storeId: this.storeId,
			};
			if (customerId) {
				obj.customerId = customerId;
			}
			this.$myRequest({
				method: "GET",
				url: "/goods/goods/storeGoodsList",
				data: obj,
			}).then((res) => {
				if (res.success === 1) {
					this.goodsList = res.data;
					this.goodsList.forEach((item) => {
						item.tagImg = setGoodsTagImg(item.tag);
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			});
		},
		/**
		 * 切换商品分类
		 * @param {Object} index
		 */
		handleChangeNav(index) {
			this.navIdx = index;
			this.navToId = index > 2 ? "nav-" + (index - 1) : "nav-0";
			this.classIdx = 0;

			this.classList = this.allLevelList.filter(
				(item) =>
					item.level === 2 &&
					(!this.navList[this.navIdx].id ||
						item.parentId === this.navList[this.navIdx].id)
			);

			this.getGoodsList();
		},
		/**
		 * 切换商品分类
		 * @param {Object} index
		 */
		handleChangeClass(item, index) {
			this.classIdx = index;
			this.getDetail((res) => {
				if (res.success === 1) {
					this.storeDetail = res.data;
				}
			});
			this.getGoodsList();
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
		applyAuth({ index, classIndex }) {
			this.goodsList[classIndex].goodsList[index].authorizeStatus = 1;
		},
		async handleAuth(obj, index) {
			if (obj.authorizeStatus < 1) return;
			if (obj.authorizeStatus === 1) {
				const url = `/pages/index/goodsDetail?goodsId=${
					obj.id
				}&storeId=${obj.storeId}&isBuyImmediately=${true}`;
				uni.navigateTo({
					url,
				});
				return;
			} else {
				uni.showLoading({
					title: "加载中",
				});
				const res = await this.$myRequest({
					url: "/goods/goods/goodsAuthorize",
					data: {
						goodsId: obj.id,
						storeId: obj.storeId,
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
				this.goodsList[index].authorizeStatus = 0;
				uni.showToast({
					title: "申请成功，待审核",
					icon: "none",
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background: #fff;
	&.padding-top {
		padding-top: 188rpx;
	}
}
.fixed-wrap {
	position: fixed;
	left: var(--window-left);
	right: var(--window-right);
	top: 0;
	padding-top: var(--status-bar-height);
	width: 100%;
	transition: all 0.5s;
	z-index: 999;
	.back-wrap {
		padding: 0 20rpx;
		height: 100%;
		image {
			transform: rotateY(180deg);
			width: 32rpx;
			height: 32rpx;
		}
	}
	&.white-bg {
		background: rgba($color: #fff, $alpha: 0.9);
	}
}
.store-bg {
	position: relative;
	width: 100%;
	height: 250rpx;
	.store-bg-img {
		width: 100%;
		height: 100%;
	}
	.masker {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(90deg, #fa683f 0%, #ffd376 100%);
		opacity: 0.9;
	}
}
.store-info-wrap {
	position: relative;
	margin-top: -40rpx;
	padding: 0 30rpx;
	height: 220rpx;
	background: #fff;
	border-radius: 20rpx 20rpx 0 0;
	.store-img {
		margin-right: 20rpx;
		width: 120rpx;
		height: 120rpx;
		border-radius: 10rpx;
		box-shadow: -5px 5px 5px -5px rgba(159, 65, 36, 0.4),
			5px 5px 5px -5px rgba(159, 65, 36, 0.4);
		background-color: #ffffff;
		transform: translateY(-20rpx);
	}
	.store-info {
		flex: 1;
		.info-up {
			padding: 20rpx 0 15rpx;
			color: #999;
			font-size: 26rpx;
		}
		.name {
			color: #333333;
			font-size: 36rpx;
			font-weight: bold;
		}
		.tips-icon {
			margin-right: 10rpx;
			width: 26rpx;
			height: 26rpx;
		}
		.info-center {
			color: #666;
			font-size: 24rpx;
		}
		.info-down {
			margin-top: 10rpx;
			color: #333;
			font-size: 28rpx;
			.strong {
				color: #ff7532;
			}
			.border {
				display: block;
				margin: 0 30rpx;
				width: 1rpx;
				height: 16rpx;
				background: #d7d7d7;
			}
		}
	}
}
.nav-list {
	height: 88rpx;
	background: #fff;
	box-shadow: 0rpx 5rpx 8rpx 0rpx rgba(219, 219, 219, 0.75);
	white-space: nowrap;
	overflow-x: auto;
	z-index: 10;
	&.fixed {
		position: fixed;
		left: var(--window-left);
		right: var(--window-right);
		top: calc(100rpx + var(--status-bar-height));
	}
	.nav-item {
		position: relative;
		display: inline-block;
		padding: 0 30rpx;
		height: 100%;
		line-height: 88rpx;
		font-size: 30rpx;
		color: #666;
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
			font-weight: bold;
			color: #333;
			.border {
				opacity: 1;
			}
		}
	}
}
.main {
	&.padding-left {
		padding-left: 160rpx;
	}
	.goods-list-wrap {
		flex: 1;
	}
}
.class-list {
	width: 160rpx;
	min-height: calc(100vh - 88rpx - 430rpx);
	overflow-y: auto;
	background: #f4f4f4;
	margin-top: 8rpx;
	&.fixed {
		position: fixed;
		left: var(--window-left);
		top: calc(100rpx + 88rpx + var(--status-bar-height));
		height: calc(100vh - 88rpx - 100rpx);
		z-index: 10;
	}
	.class-item {
		height: 107rpx;
		font-size: 30rpx;
		color: #666;
		background: #f4f4f4;
		border-bottom: 1rpx solid #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		&.active {
			color: #ff5d2b;
			background: #fff;
		}
	}
}
.goods-list {
	padding: 0 30rpx;
	.title {
		padding: 30rpx 0 0;
		color: #333333;
		font-size: 28rpx;
		image {
			margin-right: 10rpx;
			width: 12rpx;
			height: 12rpx;
		}
	}
	.goods-item {
		position: relative;
		padding: 30rpx 0 0;
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
}
.explain {
	position: relative;
	width: 640rpx;
	padding: 50rpx 45rpx;
	color: #333333;
	font-size: 30rpx;
	line-height: 58rpx;
	border-radius: 20rpx;
	background: #fff;
	transform: translateY(-100rpx);
	box-shadow: -15rpx 0rpx 0rpx NaNpx rgba(160, 160, 160, 0.24);
	.close-wrap {
		position: absolute;
		right: 0;
		top: 0;
		padding: 10rpx 30rpx;
	}
	.close-icon {
		width: 17rpx;
		height: 17rpx;
	}
	.title {
		margin-bottom: 30rpx;
		font-size: 40rpx;
		font-weight: bold;
		color: #333;
	}
}
.single-goods-wrap {
	padding: 30rpx 30rpx 30rpx;
	.goods-img {
		width: 690rpx;
		height: 690rpx;
		background: #f4eded;
		border-radius: 10rpx;
	}
	.goods-price {
		margin-top: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #ff5d2b;
		text {
			font-size: 30rpx;
		}
	}
	.goods-name {
		margin-top: 15rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #333333;
	}
	.btn {
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
