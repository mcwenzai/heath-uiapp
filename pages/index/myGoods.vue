<template>
	<view class="content page-height">
		<view class="goods-list">
			<block v-for="(item, index) in dataList" :key="index">
				<good-item
					:info="item"
					:infoIdx="index"
					:itemState="item.authorizeStatus"
					@applyAuth="applyAuth"
				>
				</good-item>
			</block>
		</view>
		<view class="loading_over" v-if="dataList.length >= 10">
			<uniLoadMore
				:status="more"
				:contentText="contentText"
			></uniLoadMore>
		</view>
		<view
			class="no-data column flex-center-center"
			v-if="dataList.length == 0"
		>
			<image src="/static/images/index/search.png"></image>
			<text>暂无商品</text>
		</view>
	</view>
</template>

<script>
import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue";
export default {
	data() {
		return {
			dataList: [],
			pagination: {
				pageNum: 1,
				pageSize: 10,
			},
			currentNavType: 0,
			more: "",
			pages: 0,
			loadingText: "加载中...",
			loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2--contentnomore
			contentText: {
				contentdown: "上拉显示更多",
				contentrefresh: "正在加载...",
				contentnomore: "没有更多了",
			},
		};
	},
	components: { uniLoadMore },
	onLoad() {
		this.getList();
	},
	methods: {
		getList() {
			let url = "/goods/goods/myGoodsList?state=1&pageNum=1&pageSize=100";
			const id = uni.getStorageSync("customerId");
			if (id) {
				url += "&customerId=" + id;
			}
			this.$myRequest({
				method: "GET",
				url: url,
			})
				.then((res) => {
					if (res.success === 1) {
						const list = res.data.list;

						list.forEach((item) => {
							item.authorizeStatus = item.authorizeStatus + 1;
						});
						this.dataList = list;
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none",
						});
					}
				})
				.catch((err) => {});
		},
		applyAuth({ index }) {
			this.list[index].authorizeStatus = 1;
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background: #fff;
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
</style>
