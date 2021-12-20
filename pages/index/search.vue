<template>
	<view class="content">
		<view class="fixed-wrap">
			<my-search
				:inputDisable="false"
				:searchkey="searchKey"
				:isFocus="true"
				@searchData="handleSearch"
			>
				<template v-slot:back>
					<view class="back-wrap flex-center-center">
						<image src="/static/images/arrow_left.png"></image>
					</view>
				</template>
			</my-search>
		</view>
		<view class="goods-list" v-if="goodsList.length">
			<block v-for="(item, index) in goodsList" :key="index">
				<good-item
					:info="item"
					@applyAuth="applyAuth"
					:infoIdx="index"
					:itemState="item.authorizeStatus"
				></good-item>
			</block>
		</view>
		<view class="history-list" v-else-if="historyList.length && !searchKey">
			<view class="label flex-between-center">
				<text>历史搜索</text>
				<view class="del-btn flex-start-center" @click="handleDelHis">
					<image
						src="/static/images/index/del.png"
						class="del-icon"
					></image
					>清空
				</view>
			</view>
			<view class="list flex-wrap">
				<view
					class="list-item"
					v-for="(item, index) in historyList"
					:key="index"
					@click="handleSearch(item)"
					>{{ item }}</view
				>
			</view>
		</view>
		<view class="no-data column flex-center-center" v-else-if="searchKey">
			<image src="/static/images/index/search.png"></image>
			<text>十分抱歉，没找到您要的商品</text>
		</view>
		<view class="no-data column flex-center-center" v-else>
			<image src="/static/images/index/search.png"></image>
			<text>暂无历史搜索</text>
		</view>
		<auth-tips></auth-tips>
	</view>
</template>

<script>
import authTips from "@/components/authTips.vue";
import { goodsAuth } from "@/libs/tool.js";

export default {
	data() {
		return {
			searchKey: "", // 搜索关键词
			pageNum: 1,
			pageSize: 100,
			goodsList: [], // 商品列表
			historyList: [], // 历史搜索
			quaInfo: {}, // 资质认证信息
			storeId: null,
		};
	},
	components: {
		authTips,
	},
	onShow() {
		this.quaInfo = uni.getStorageSync("qualificationInfo");
	},
	onLoad(options) {
		if (uni.getStorageSync("historyList")) {
			this.historyList = [
				...new Set(uni.getStorageSync("historyList")),
			].splice(0, 10);
		} else {
			this.historyList = [];
		}
		this.storeId = options.storeId || null;
	},
	methods: {
		getGoodsList(type) {
			const obj = {
				goodsName: this.searchKey,
				pageNum: this.pageNum,
				pageSize: this.pageSize,
			};
			if (this.storeId) {
				obj.storeId = this.storeId;
			}
			const id = uni.getStorageSync("customerId");
			if (id) {
				obj.customerId = id;
			}
			this.$myRequest({
				method: "POST",
				url: "/goods/goods/searchList",
				data: obj,
			})
				.then((res) => {
					if (res.success === 1) {
						this.goodsList = res.data.list;
						this.goodsList.forEach((item1) => {
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
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {
					uni.showToast({
						title: err,
						icon: "none",
					});
				});
		},
		handleSearch(searchKey) {
			if (!searchKey) {
				this.goodsList = [];
				this.searchKey = "";
				return;
			}
			this.historyList.unshift(searchKey);
			this.historyList = [...new Set(this.historyList)].splice(0, 10);
			this.searchKey = searchKey;
			this.pageNum = 1;
			uni.setStorageSync("historyList", [
				...[this.searchKey],
				...uni.getStorageSync("historyList"),
			]);
			this.getGoodsList();
		},
		/**
		 * 删除历史搜索
		 */
		handleDelHis() {
			this.historyList = [];
			uni.removeStorageSync("historyList");
		},
		handleDetail(goods) {
			uni.navigateTo({
				url: `/pages/index/goodsDetail?goodsId=${goods.id}&storeId=${goods.storeId}`,
			});
		},
		applyAuth({ index }) {
			this.goodsList[index].authorizeStatus = 1;
		},
	},
	onReachBottom() {
		// this.getGoodsList("loadmore");
	},
};
</script>

<style lang="scss" scoped>
.content {
	min-height: 100vh;
	background: #fff;
	padding-top: calc(100rpx + var(--status-bar-height));
}
.fixed-wrap {
	position: fixed;
	left: var(--window-left);
	right: var(--window-right);
	top: 0;
	padding-top: var(--status-bar-height);
	width: 100%;
	background: #fff;
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
}
.goods-list {
	padding: 0 30rpx;
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
.history-list {
	padding: 20rpx 30rpx;
	.label {
		padding: 40rpx 0;
		font-size: 32rpx;
		color: #666;
		.del-icon {
			margin-right: 10rpx;
			width: 32rpx;
			height: 30rpx;
		}
		.del-btn {
			color: #ff7247;
			font-size: 28rpx;
		}
	}
	.list-item {
		margin-bottom: 20rpx;
		width: 50%;
		font-size: 32rpx;
		color: #333;
	}
}
</style>
