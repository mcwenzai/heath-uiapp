<template>
	<view>
		<template v-if="quaInfo.buyerQualificationStatus === 0">
			<view class="search-top"
				><my-search
					:inputDisable="false"
					@searchData="queryList"
					placeholderText="搜索饮片"
					:searchkey="searchKey"
				></my-search
			></view>
			<!-- 商品列表 -->
			<view class="select-goods" v-if="navsArr && navsArr.length">
				<!-- 店铺导航栏 -->
				<scroll-view
					class="nav-wrap"
					:scroll-x="true"
					:scroll-into-view="navToId"
				>
					<block v-for="(item, index) in navsArr" :key="index">
						<view
							:class="[
								'nav-item',
								index === navIdx ? 'nav-active' : '',
							]"
							@tap="changeNav(index)"
							:id="'nav-' + index"
						>
							<image :src="item.logoUrl"></image>
						</view>
					</block>
					<view style="height: 100rpx"> </view>
				</scroll-view>
				<!-- 信息提示栏 -->
				<view
					class="brand-wrap app-f"
					style="display: flex; justify-content: space-between"
				>
					<view
						class="brand-info"
						style="width: 400rpx; line-height: 40rpx"
					>
						<view
							>全部商品 {{ storeInfo.goodsTotal || 0 }}
							&nbsp;&nbsp;&nbsp;&nbsp;起批金额
							{{
								storeInfo.store
									? storeInfo.store.startAmount
									: 0
							}}
						</view>
						<view>{{
							storeInfo.store ? storeInfo.store.explain : ""
						}}</view>
					</view>
					<view
						class="buy-tip app-f app-f-aic app-f-jcc"
						@tap="$refs.explain.open()"
					>
						<image src="/static/images/tips.png"></image>
						<text>购买须知</text>
					</view>
				</view>
				<!-- 商品列表栏 -->
				<scroll-view
					@scroll="scrollTo"
					scroll-y="true"
					class="select-goods-content"
					:scroll-into-view="scrollIntoViewId"
					enable-back-to-top="true"
				>
					<view
						v-for="(item, index) in goodsList"
						:key="index"
						class="city-item"
						:id="item.head"
					>
						<view class="goods-item-content">
							<!-- <view
								class="itemLeft"
								@click="goDetail(item.valueList)"
							>
								<image
									class="itemLeft"
									:src="item.valueList.skuImgUrl"
									mode=""
								></image>
							</view> -->
							<view class="goodsInfo">
								<view @click="goDetail(item.valueList)">
									<view class="skuInfo">
										{{ item.valueList.goodsName }}
										{{ item.valueList.skuName }}
									</view>
									<view class="orgPlace" style="font-weight: 400;color: #606266;">
										{{ item.valueList.place }}
									</view>
									<view class="price">
										￥{{ item.valueList.price.toFixed(2) }}
									</view>
								</view>
								<!-- 购物车图标 -->
								<view class="itemIcon">
									<view
										v-if="item.valueList.stockAmount == 0"
										class="icon"
									></view>
									<view
										v-if="item.valueList.stockAmount != 0"
										class="icon1"
										@tap="addCart(index)"
									></view>
									<view
										v-if="
											item.valueList.amount &&
											item.valueList.state == 0
										"
										class="numTag"
										style="background-color: #bbbbbb"
									>
										{{
											item.valueList.amount | countFilter
										}}
									</view>
									<view
										v-if="
											item.valueList.amount &&
											item.valueList.state != 0
										"
										class="numTag"
									>
										{{
											item.valueList.amount | countFilter
										}}
									</view>
								</view>
							</view>
						</view>
					</view>
					<view style="height: 500rpx"></view>
				</scroll-view>
				<!-- 侧边栏字母 -->
				<view
					class="index-content"
					v-if="this.goodsList.length === this.totalNum && showLetter"
				>
					<view
						v-for="(item, index) in headList"
						:key="index"
						@tap="switchIndex(item)"
						class="index-item"
						:class="item == scrollIntoViewIdStyle ? 'active' : ''"
						>{{ item }}</view
					>
				</view>
			</view>
			<!-- 无商品列表 -->
			<view
				class="empty app-f app-f-fdc app-f-aic app-f-jcc"
				v-else
				style="position: relative; padding-top: 700rpx"
			>
				<image
					src="/static/images/index/search.png"
					style="position: absolute; top: 550rpx; z-index: 10"
				>
				</image>
				<view>暂无商品</view>
			</view>
			<!-- 底部操作 -->
			<service-btn></service-btn>
			<view class="bottom-wrap app-f app-f-aic app-f-jcsb">
				<view class="total-price">
					<text>合计</text>
					<text>￥{{ (totalPrice + totalPrices).toFixed(2) }}</text>
				</view>
				<view
					class="go-cart-btn app-f app-f-aic app-f-jcc"
					@tap="goCart"
					>去购物车结算</view
				>
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
					<text>{{
						storeInfo.store ? storeInfo.store.buyInstructions : ""
					}}</text>
				</view>
			</uni-popup>
		</template>
		<template v-else>
			<grain-no-certification></grain-no-certification>
		</template>
	</view>
</template>

<script>
import moreListMixin from "@/mixins/moreList";
import { mapState } from "vuex";
let timer = null; // 滚动事件防抖的定时器对象
let mode = "scroll"; // scroll、click 滑动左侧城市列表（控制右侧字母的高亮）还是点击右侧字母（控制左侧列表的滚动）
let totalLength = 0; // 左侧列表元素总个数
export default {
	mixins: [moreListMixin],
	data() {
		return {
			navIdx: 0,
			navsArr: [],
			navToId: "",
			list: [],
			navHeight: 0,
			brandInfoHeight: 0,
			searchHeight: 0,
			searchKey: "",
			cartList: [],
			storeInfo: {},
			goodsList: [],
			totalNum: 0,
			totalPrices: 0,
			customerId: "",
			headList: [], // 首字母缩写列表
			scrollIntoViewId: "A", // 跳转到的某子元素id
			scrollIntoViewIdStyle: "A",
			showLetter: true,
		};
	},
	onShow() {
		this.initListInfo();
		this.customerId = uni.getStorageSync("customerId");
		this.getNavList();
	},
	computed: {
		...mapState({
			quaInfo: (store) => store.certification.info,
		}),
		totalPrice() {
			const list = this.cartList;
			if (!list || list.length === 0) return 0;
			let res = 0;
			list.forEach((item) => {
				res += (item.price || 0) * (item.amount || 1);
			});
			return res;
		},
	},
	filters: {
		countFilter(val) {
			return val > 99 ? "99+" : val;
		},
	},
	onBackPress(e) {
		uni.$emit("cartUpdate", {});
		uni.hideLoading();
		uni.switchTab({
			url: "/pages/index/index",
		});
		return true;
	},
	methods: {
		// 滑动监听
		scrollTo(e) {
			// 监听scrollview滚动事件，获取顶部元素
			if (mode === "click") {
				// 如果是点击右侧字母触发的滚动事件则不执行下面的逻辑
				mode = "scroll";
				return;
			}
			if (timer !== null) {
				// 防抖函数
				clearTimeout(timer);
				timer = null;
			}
			const height = e.target.scrollHeight; // scrollview总高度，为减少重流所有所以
			timer = setTimeout(() => {
				// TODO：有时候明明已经滚动了顶部，但是仍然e.target.scrollTop不为0
				const scrollTop = e.target.scrollTop;
				// 通过scrollview溢出的高度/scrollview总高度=顶部字母的位置/左侧列表元素总的个数
				// 求出需要在右侧高亮的顶部字母
				let index = (totalLength * scrollTop) / height;
				index = Math.ceil(index);
				// 获取顶部字母
				this.scrollIntoViewIdStyle = this.getLetter(
					this.goodsList,
					index
				);
			}, 0);
		},
		// 字母查
		getLetter(list = [], index) {
			let current = 0; // 左侧列表的索引
			let currentLetter = list.length ? list[0].head : ""; // 默认第一个
			// 遍历左侧列表包括字母和药品名称，匹配出要高亮的字母
			for (var i = 0; i < list.length; i++) {
				const item = list[i];
				if (index === current) {
					// 字母
					currentLetter = item.head;
					break;
				}
				current++;
			}
			return currentLetter;
		},
		// 点击右侧切换药品首字母
		switchIndex(data) {
			mode = "click";
			this.scrollIntoViewId = this.scrollIntoViewIdStyle;
			setTimeout(() => {
				this.scrollIntoViewId = data;
				this.scrollIntoViewIdStyle = data;
			}, 0);
		},
		queryList(v) {
			this.searchKey = v;
			this.searchKey == ""
				? (this.showLetter = true)
				: (this.showLetter = false);
			this.initListInfo();
			this.getList();
		},
		changeNav(index) {
			this.initListInfo();
			this.totalPrices = 0;
			this.navIdx = index;
			const n = Math.floor(index / 4);
			this.navToId = "nav-" + n * 4;
			this.searchKey = "";
			this.cartList = [];
			this.getStoreInfo();
			this.getList();
		},
		getMoreList() {
			if (this.quaInfo.buyerQualificationStatus !== 0) return;
			this.pageNum++;
			this.getList();
		},

		async getList() {
			const id = this.navsArr[this.navIdx].id;
			const obj = {
				pageSize: 1200,
				pageNum: this.pageNum,
				type: 2,
				storeId: id,
				customerId: this.customerId,
			};
			// 关键字搜索
			if (this.searchKey) {
				obj.keyword = this.searchKey;
			}
			// 采购资质判断
			if (this.quaInfo.buyerQualificationStatus === 0) {
				this.startShowLoading();
			}
			// 请求函数
			const res = await this.$myRequest({
				url: "/goods/goods/storeGoodsListByType",
				data: obj,
			});
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			let list = res.data.list;
			this.initPageNum(list);
			// 列表总数
			this.totalNum = res.data.total;
			const flag = list && list.length;
			list.forEach((item, index) => {
				item.headcharacter = item.pinyin
					.substr(0, 1)
					.toLocaleUpperCase();
			});
			// 已经采购数据
			if (this.pageNum === 1 && flag) {
				this.getCartList(list);
			} else if (flag) {
				this.setListCartNum(list);
			} else {
				this.goodsList = [...this.goodsList, ...list];
			}
			const goodsList = list;
			totalLength = goodsList.length;
			// 列表过滤
			for (let elem of goodsList.values()) {
				// 获取首字母
				const head = elem.headcharacter;
				// const index = this.headList.indexOf(head);
				this.goodsList.push({
					head,
					valueList: elem,
				});
			}
			// 首次进入默认值
			this.headList = [
				"A",
				"B",
				"C",
				"D",
				"E",
				"F",
				"G",
				"H",
				"I",
				"J",
				"K",
				"L",
				"M",
				"N",
				"O",
				"P",
				"Q",
				"R",
				"S",
				"T",
				"U",
				"V",
				"W",
				"X",
				"Y",
				"Z",
			];
			totalLength = this.totalNum;
			if (this.goodsList.length !== this.totalNum) {
				this.getMoreList();
			}
			if(totalLength == this.goodsList.length){
				uni.hideLoading()
			}
		},
		async getNavList() {
			let customerId = uni.getStorageSync("customerId");
			const res = await this.$myRequest({
				url: "/goods/store/storeListByGoods",
				data: {
					type: 2,
					customerId: customerId,
				},
			});

			if (res.success !== 1) return;
			const list = res.data.list;
			this.navsArr = list;
			this.getStoreInfo();
			this.getList();
		},
		async getCartList(goodsList) {
			const res = await this.$myRequest({
				url: "/goods/cart/cartList?customerId=" + this.customerId,
			});
			if (res.success !== 1) return;
			const list = res.data.normal;
			const storeId = this.navsArr[this.navIdx].id;
			const data = list.find((item) => item.storeId === storeId);
			if (data) {
				const arr = data.goodsList ? data.goodsList : [];
				this.cartList = arr.filter((item) => item.type === 2);
			}
			this.setListCartNum(goodsList);
		},
		setListCartNum(list) {
			const cartList = this.cartList;
			cartList.forEach((item, index) => {
				this.goodsList.forEach((items, indexs) => {
					if (
						item.id == items.valueList.id &&
						item.skuId == items.valueList.skuId
					) {
						this.$nextTick(function () {
							items.valueList.amount = item.amount;
						});
					}
				});
			});
		},
		// 数据初始化
		initListInfo() {
			this.goodsList = [];
			this.pageNum = 1;
			// 初始化调转元素id
			this.scrollIntoViewId="A"
			this.scrollIntoViewIdStyle="A"
		},
		async getStoreInfo() {
			const id = this.navsArr[this.navIdx].id;
			const res = await this.$myRequest({
				url: "/goods/store/storeDetailByType",
				data: { storeId: id, type: 2, customerId: this.customerId },
			});
			if (res.success !== 1) return;
			this.storeInfo = res.data;
		},
		goCart() {
			uni.$emit("cartUpdate", {});
			uni.switchTab({ url: "/pages/cart/index" });
		},
		/**
		 *  @param {Number} goodsIndex 商品索引
		 * */
		addCart(goodsIndex) {
			let goodsInfo = this.goodsList[goodsIndex].valueList;
			let amount = 0;
			// 如果没有起批量，初始值为1
			!goodsInfo.packageNum
				? (amount = 1)
				: (amount = goodsInfo.packageNum);
			if (goodsInfo.stockAmount < goodsInfo.packageNum + goodsInfo.amount)
				return uni.showToast({ title: "商品库存不足", icon: "none" });
			let data = {
				storeId: goodsInfo.storeId,
				goodsId: goodsInfo.id,
				skuId: goodsInfo.skuId,
				amount: amount,
				price: goodsInfo.price,
				skuPriceId: goodsInfo.skuPriceId,
				customerId: this.customerId,
			};
			let addAmount = this.goodsList[goodsIndex].valueList.amount;
			addAmount += amount;
			if (addAmount > this.goodsList[goodsIndex].valueList.stockAmount)
				return uni.showToast({ title: "库存不足", icon: "none" });
			this.$myRequest({
				method: "POST",
				url: "/goods/cart/saveCart",
				data: data,
			}).then((res) => {
				if (res.success == 1) {
					this.goodsList[goodsIndex].valueList.amount = addAmount;
					this.statistics(goodsInfo);
				} else {
					uni.showToast({
						title: res.msg || "添加异常",
						icon: "none",
					});
				}
			});
		},
		//统计
		statistics(params) {
			let packageNums = params.packageNum;
			if (!packageNums) {
				packageNums = 1;
			}
			this.totalPrices = this.totalPrices + packageNums * params.price;
		},
		goDetail(params) {
			uni.navigateTo({
				url:
					"/pages/grain/grainDetail?goodsId=" +
					params.id +
					"&storeId=" +
					params.storeId +
					"&type=2",
			});
		},
		initPageNum(list) {
			if (this.pageNum > 1 && (!list || list.length < 100)) {
				this.pageNum--;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.page-wrap {
	background-color: #fff;
	touch-action: none;
	overflow: visible;
	height: 100vh;
}
.search-top {
	position: fixed;
	top: 0;
	width: 750rpx;
	background-color: #fff;
	z-index: 999;
}
.nav-wrap {
	width: 750rpx;
	height: 170rpx;
	white-space: nowrap;
	padding: 0 15rpx 30rpx;
	margin-top: 80rpx;
	background-color: #fff;
	.nav-item {
		display: inline-block;
		height: 120rpx;
		width: 120rpx;
		border: 1rpx solid #aaa;
		opacity: 0.5;
		margin: 20rpx 15rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
		image {
			width: 82rpx;
			height: 78rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-50%);
		}
		&.nav-active {
			border: 4rpx solid #ff7247;
			opacity: 1;
		}
	}
}
.brand-wrap {
	padding: 20rpx 30rpx;
	background: #f4f4f4;
	// position: fixed;
	// top: 270rpx;
	margin-top: -20rpx;
	width: 750rpx;
	z-index: 99;
	.buy-tip {
		font-size: 26rpx;
		color: #999999;
		height: 30rpx;
		image {
			width: 26rpx;
			height: 26rpx;
			margin-right: 10rpx;
		}
	}
	.brand-info {
		font-size: 26rpx;
		color: #333333;
	}
}
.empty {
	height: 350rpx;
	image {
		width: 113rpx;
		height: 118rpx;
	}
	view {
		font-size: 32rpx;

		color: #666666;
		margin-top: 30rpx;
	}
}

.bottom-wrap {
	width: 750rpx;
	border-top: 1rpx solid #d7d7d7;
	padding: 10rpx 30rpx;
	position: fixed;
	bottom: 0;
	z-index: 99;
	background-color: #fff;
	padding-bottom: calc(
		20rpx + constant(safe-area-inset-bottom)
	); /* 兼容 iOS < 11.2 */
	padding-bottom: calc(
		20rpx + env(safe-area-inset-bottom)
	); /* 兼容 iOS >= 11.2 */

	.total-price {
		font-size: 32rpx;
		color: #333;
		text:last-child {
			color: #ff5d2b;
			font-weight: bold;
		}
	}
	.go-cart-btn {
		width: 250rpx;
		height: 80rpx;
		background: #ff7247;
		border-radius: 40rpx;
		color: #fff;
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
.goodsList {
	width: 660rpx;
	// height: 840rpx;
	// margin: 420rpx auto 0rpx;
	.goodsItem {
		height: 172rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.itemRight {
			width: 560rpx;
			height: 172rpx;
			border-bottom: 2rpx solid rgba(181, 181, 181, 0.5);
			display: flex;
			align-items: center;
			justify-content: space-between;
			.skuInfo {
				font-size: 30rpx;
				line-height: 50rpx;
				color: #333333;
			}
			.orgPlace {
				font-size: 24rpx;
			}
			.price {
				font-size: 30rpx;
				font-weight: 700;
				color: #ff5d2b;
			}
		}
	}
}

.select-goods {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	.city-top {
		background: #fafafa;
		padding: 0 0 0 40rpx;
		position: fixed;
		height: 70upx;
		line-height: 70upx;
		top: 0upx;
		vertical-align: middle;
		z-index: 5;
		width: 100%;
		font-weight: bold;
		font-family: PingFangSC-Semibold;
		font-size: 30rpx;
		color: #141e25;
		letter-spacing: 0;
		border-bottom: 2rpx solid #efefef;
	}
	.select-goods-content {
		height: 100%;
		.city-item {
			.city-item-title {
				background: #f5f5f5;
				height: 50rpx;
				line-height: 50rpx;
				font-family: PingFangSC-Semibold;
				font-size: 24rpx;
				color: #778690;
				padding-left: 40rpx;
			}
			.goods-item-content {
				display: flex;
				align-items: center;
				padding-left: 40rpx;
				height: 172rpx;
				.itemLeft {
					width: 110rpx;
					height: 110rpx;
					background: #ffffff;
					border: 2rpx solid rgba(223, 223, 223, 0.46);
					border-radius: 4rpx 5rpx 5rpx 5rpx;
					margin-right: 21rpx;
				}
				.goodsInfo {
					width: 550rpx;
					font-family: PingFangSC-Semibold;
					font-size: 30rpx;
					color: #141e25;
					letter-spacing: 0;
					display: flex;
					justify-content: space-between;
					.skuInfo {
						font-size: 30rpx;
						line-height: 50rpx;
						color: #333333;
					}
					.orgPlace {
						font-size: 24rpx;
						color: #333333;
					}
					.price {
						font-size: 30rpx;
						font-weight: 700;
						color: #ff5d2b;
					}
				}
				.itemIcon {
					width: 47rpx;
					height: 45rpx;
					position: relative;
					margin-top: 70rpx;
					margin-right: -85rpx;
					.icon {
						width: 47rpx;
						height: 45rpx;
						background: url(../../static/images/grain/cart.png)
							no-repeat;
						background-size: 100% 100%;
					}
					.icon1 {
						width: 47rpx;
						height: 45rpx;
						background: url(../../static/images/grain/cart-active.png)
							no-repeat;
						background-size: 100% 100%;
					}
					.numTag {
						width: 50rpx;
						height: 30rpx;
						border-radius: 15rpx;
						background-color: #ff7247;
						position: absolute;
						top: -8rpx;
						left: -30rpx;
						color: #ffffff;
						font-size: 18rpx;
						text-align: center;
						line-height: 30rpx;
					}
				}
			}
		}
	}
	.index-content {
		position: fixed;
		right: 10rpx;
		top: 60%;
		transform: translateY(-50%);
		.index-item {
			font-family: PingFangSC-Semibold;
			font-size: 18rpx;
			letter-spacing: 0;
			text-align: center;
			line-height: 26rpx;
			margin-top: 1rpx;
			color: #778690;
			&.active {
				width: 41rpx;
				height: 34rpx;
				color: #ffffff;
				font-size: 24rpx;
				border-radius: 50%;
				font-weight: 700;
				line-height: 34rpx;
				padding-right: 6rpx;
				margin-right: 10rpx;
				background: url(../../static/letter_nav.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
}
</style>
