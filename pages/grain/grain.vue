<template>
	<view style="background-color: #fff; overflow-y: hidden">
		<template v-if="quaInfo.buyerQualificationStatus === 0">
			<!-- 搜索栏 -->
			<view class="search-top"
				><my-search
					:inputDisable="false"
					@searchData="queryList"
					placeholderText="搜索颗粒"
					:searchkey="searchKey"
				></my-search
			></view>
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
			</scroll-view>
			<!-- 购买提示信息 -->
			<view class="brand-wrap app-f">
				<view class="brand-info app-f-f1">
					<view
						>全部商品 {{ storeInfo.goodsTotal || 0 }}
						&nbsp;&nbsp;&nbsp;&nbsp;起批金额
						{{ storeInfo.store ? storeInfo.store.startAmount : "" }}
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
			<!-- 商品列表标题 -->
			<view :style="tableHeaderStyle">
				<grain-item :isTitle="true" :info="tableHeader"></grain-item>
			</view>
			<!-- 商品列表 -->
			<view class="select-goods" v-if="list && list.length">
				<scroll-view
					@scroll="scrollTo"
					:scroll-y="goodsListScroll"
					class="select-goods-content"
					:scroll-into-view="scrollIntoViewId"
					@scrolltoupper="upper"
					enable-back-to-top="true"
				>
					<block v-for="(item, index) in list" :key="index">
						<grain-item
							:info="item.valueList"
							@addCart="addCart"
							:id="item.head"
						></grain-item>
					</block>
				</scroll-view>
				<!-- 侧边栏字母 -->
				<view
					class="index-content"
					v-if="this.list.length === this.totalNum && showLetter"
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

			<!-- 空列表显示 -->
			<view class="empty app-f app-f-fdc app-f-aic app-f-jcc" v-else>
				<image src="/static/images/index/search.png"> </image>
				<view>暂无商品</view>
			</view>
			<view style="height: 200rpx"></view>
			<service-btn></service-btn>
			<view class="bottom-wrap app-f app-f-aic app-f-jcsb">
				<view class="total-price">
					<text>合计</text>
					<text>￥{{ totalPrice.toFixed(2) }}</text>
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
			tableHeader: {
				goodsName: "商品名称",
				skuName: "规格",
				effectRatio: "当量",
				price: "直采价",
			},
			list: [],
			navHeight: 0,
			brandInfoHeight: 0,
			searchHeight: 0,
			tableHeaderStyle: "",
			searchKey: "",
			cartList: [],
			storeInfo: {},
			customerId: "",
			totalNum: 0,
			headList: [], // 首字母缩写列表
			scrollIntoViewId: "A", // 跳转到的某子元素id
			scrollIntoViewIdStyle: "A",
			showLetter: true,
			goodsListScroll: false,
			ViewScrollTop: "",
			windowHeight: "",
		};
	},
	onShow() {
		this.initListInfo();
		this.customerId = uni.getStorageSync("customerId") || "";
		this.getNavList();
	},
	mounted() {
		this.getHideHeight();
	},
	onPageScroll(e) {
		if (this.quaInfo.buyerQualificationStatus !== 0) return;
		const v = e.scrollTop;
		this.ViewScrollTop = v;
		if (v + 20 >= this.navHeight + this.brandInfoHeight) {
			this.tableHeaderStyle = `position:fixed;width:750rpx;top:${
				this.searchHeight - 10
			}px;z-index:90;height:120rpx;background-color:#fff`;
			this.goodsListScroll = true;
		} else {
			this.tableHeaderStyle = "backgound-color:#fff";
			this.goodsListScroll = false;
		}
	},
	onBackPress(e) {
		uni.$emit("cartUpdate", {});
		uni.hideLoading();
		uni.switchTab({
			url: "/pages/index/index",
		});
		return true;
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
	onLoad() {
		uni.getSystemInfo({
			success: function (res) {
				this.windowHeight = res.windowHeight;
			}.bind(this),
		});
	},
	methods: {
		upper() {
			uni.pageScrollTo({
				scrollTop: 0,
			});
		},
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
				this.scrollIntoViewIdStyle = this.getLetter(this.list, index);
			}, 0);
		},
		// 字母
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
			this.goodsListScroll = true;
			if (
				this.ViewScrollTop + 20 >=
				this.navHeight + this.brandInfoHeight
			) {
			} else {
				let distance = 19;
				if (this.windowHeight > 615) {
					distance = 14;
				}
				uni.pageScrollTo({
					scrollTop: this.navHeight + this.brandInfoHeight - distance,
				});
				data = "A";
			}
			mode = "click";
			this.scrollIntoViewId = this.scrollIntoViewIdStyle;
			this.scrollIntoViewId = data;
			this.scrollIntoViewIdStyle = data;
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
			this.navIdx = index;
			const n = Math.floor(index / 3);
			this.navToId = "nav-" + n * 3;
			this.initListInfo();
			this.searchKey = "";
			this.cartList = [];
			this.getList();
			this.getStoreInfo();
		},
		getHideHeight() {
			const query = uni.createSelectorQuery().in(this);
			const nav = query.select(".nav-wrap");
			const brand = query.select(".brand-wrap");
			const search = query.select(".search-top");
			nav.boundingClientRect((data) => {
				this.navHeight = data.height;
			}).exec();
			brand
				.boundingClientRect((data) => {
					this.brandInfoHeight = data.height;
				})
				.exec();
			search
				.boundingClientRect((data) => {
					this.searchHeight = data.height;
				})
				.exec();
		},

		getMoreList() {
			if (this.quaInfo.buyerQualificationStatus !== 0) return;
			this.pageNum++;
			this.getList();
		},
		async getList() {
			const id = this.navsArr[this.navIdx].id;
			const obj = {
				pageSize: 100,
				pageNum: this.pageNum,
				type: 1,
				storeId: id,
				customerId: this.customerId,
			};
			if (this.searchKey) {
				obj.keyword = this.searchKey;
			}
			if (this.quaInfo.buyerQualificationStatus === 0) {
				this.startShowLoading();
			}

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
			this.initTimer();
			list = list && list.length ? list : [];
			const total = this.list.length;
			this.totalNum = res.data.total;
			// const num = total % 30;
			// if (num > 0) {
			// 	list.splice(0, num);
			// }
			list.forEach((item, index) => {
				item.headcharacter = item.pinyin
					.substr(0, 1)
					.toLocaleUpperCase();
			});
			totalLength = list.length;
			const flag = list && list.length;
			if (this.pageNum === 1 && flag) {
				this.getCartList(list);
			} else if (flag) {
				this.setListCartNum(list);
			}
			this.endHideLoading();
			if (this.list.length !== this.totalNum) {
				this.getMoreList();
			}
		},

		async getNavList() {
			const res = await this.$myRequest({
				url: "/goods/store/storeListByGoods",
				data: {
					type: 1,
					customerId: this.customerId,
				},
			});

			if (res.success !== 1) return;
			const list = res.data.list;
			this.navsArr = list;
			this.getStoreInfo();
			this.getList();
		},
		async getCartList(goodsList) {
			const obj = {};
			if (this.customerId) {
				obj.customerId = this.customerId;
			}
			const res = await this.$myRequest({
				url: "/goods/cart/cartList",
				data: obj,
			});
			if (res.success !== 1) return;
			const list = res.data.normal;
			const storeId = this.navsArr[this.navIdx].id;
			const data = list.find((item) => item.storeId === storeId);
			if (data) {
				const arr = data.goodsList ? data.goodsList : [];
				this.cartList = arr.filter((item) => item.type === 1);
			}
			this.setListCartNum(goodsList);
		},
		setListCartNum(list) {
			const cart = this.cartList;
			list.forEach((item1) => {
				item1.marketPrice = item1.price;
				item1.cartNum = 0;
				const a = cart.find(
					(item2) =>
						item1.id === item2.id && item1.skuId === item2.skuId
				);
				if (a) {
					item1.cartNum = a.amount;
				}
			});
			// 列表过滤
			for (let elem of list.values()) {
				// 获取首字母
				const head = elem.headcharacter;
				// const index = this.headList.indexOf(head);
				this.list.push({
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
			totalLength = this.list.length;
		},
		initListInfo() {
			this.list = [];
			this.pageNum = 1;
			// 初始化调转元素id
			this.scrollIntoViewId = "A";
			this.scrollIntoViewIdStyle = "A";
		},
		async getStoreInfo() {
			const id = this.navsArr[this.navIdx].id;
			const res = await this.$myRequest({
				url: "/goods/store/storeDetailByType",
				data: { storeId: id, type: 1, customerId: this.customerId },
			});
			if (res.success !== 1) return;
			this.storeInfo = res.data || {};
		},
		goCart() {
			uni.$emit("cartUpdate", {});
			uni.switchTab({ url: "/pages/cart/index" });
		},
		addCart(obj) {
			// console.log(obj);
			const list = this.cartList;
			const a = list.find(
				(item) => item.id === obj.id && item.skuId === obj.skuId
			);
			if (a) {
				a.amount += obj.packageNum || 1;
			} else {
				const res = { ...obj };
				res.amount = obj.packageNum || 1;
				this.cartList.push(res);
			}
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
	// touch-action: none;
	// max-height: 100vh;
}
.search-top {
	position: fixed;
	top: 0;
	width: 750rpx;
	background-color: #fff;
	z-index: 9999;
}
.nav-wrap {
	width: 750rpx;
	height: 170rpx;
	white-space: nowrap;
	padding: 0 15rpx 30rpx;
	margin-top: 100rpx;
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
	margin-top: -10rpx;
	background: #f4f4f4;
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
			}
		}
	}
	.index-content {
		position: fixed;
		right: 10rpx;
		top: 61%;
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
