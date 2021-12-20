<template>
	<view class="content">
		<!-- <view class="status_bar"></view> -->
		<view class="fixed-wrap" @click="handleSearch('/pages/index/search')">
			<my-search></my-search>
		</view>
		<scroll-view
			class="nav-list"
			:scroll-x="true"
			:scroll-into-view="navToId"
			show-scrollbar="false"
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
		<view class="main flex">
			<view class="class-list">
				<scroll-view scroll-y style="height: 100%">
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
				</scroll-view>
			</view>
			<view class="goods-list-wrap">
				<scroll-view scroll-y style="height: 100%">
					<view
						class="goods-list"
						v-for="(item, index) in goodsList"
						:key="index"
						:id="'id' + item.id"
					>
						<template
							v-if="item.goodsList && item.goodsList.length"
						>
							<view class="title flex-start-center"
								><image src="/static/images/dot.png"></image
								>{{ item.classifyName }}</view
							>
							<block
								v-for="(goods, key) in item.goodsList"
								:key="key"
							>
								<good-item
									:info="goods"
									@applyAuth="applyAuth"
									:classIdx="index"
									:infoIdx="key"
									:itemState="goods.authorizeStatus"
								>
								</good-item>
							</block>
						</template>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import { isLogin } from "@/libs/isLogin";
export default {
	data() {
		return {
			allLevelList: [],
			navList: [],
			navIdx: 0,
			classList: [],
			classIdx: 0,
			goodsList: [],
			navToId: "",
		};
	},
	onShow() {
		isLogin().then(v => {
			if(v){
				this.getClassList();
			}
		})
	},
	methods: {
		/**
		 * 获取商品分类列表
		 */
		getClassList() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/classify/list?customerId=" + customerId,
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
					const obj = uni.getStorageSync("classObj");
					if (obj) {
						const index = this.navList.findIndex(
							(item) => item.id === obj.parentId
						);
						this.navIdx = index;
						if (!obj.classId) {
							this.handleChangeNav(index);
						} else {
							this.classList = this.allLevelList.filter(
								(item) =>
									item.level === 2 &&
									(!this.navList[index].id ||
										item.parentId ===
											this.navList[index].id)
							);
							this.classIdx = this.classList.findIndex(
								(item) => item.id === obj.classId
							);
						}
						uni.removeStorageSync("classObj");
					} else {
						this.classList = this.allLevelList.filter(
							(item) =>
								item.level === 2 &&
								(!this.navList[this.navIdx].id ||
									item.parentId ===
										this.navList[this.navIdx].id)
						);
					}
					this.getGoodsList();
				} else {
					uni.showToast({
						title: res.msg,
						icon: "none",
					});
				}
			}).catch((err) => {});
		},
		getGoodsList() {
			let customerId = uni.getStorageSync("customerId");
			this.$myRequest({
				method: "GET",
				url: "/goods/goods/goodsListByClassify",
				data: {
					classifyId: this.classList[this.classIdx].id,
					customerId: customerId,
				},
			}).then((res) => {
				if (res.success === 1) {
					const data = res.data;
					data.forEach((item) => {
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
			}).catch((err) => {
					// uni.showToast({
					// 	title: '网络连接失败，请稍后再试',
					// 	icon: "none",
					// });
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
			this.getGoodsList();
		},
		/**
		 * 跳转子页面
		 * @param {Object} url 页面路径
		 */
		handleDetail(obj) {
			const url = `/pages/index/goodsDetail?goodsId=${obj.id}&storeId=${obj.storeId}`;
			uni.navigateTo({
				url,
			});
		},
		handleSearch(params) {
			uni.navigateTo({
				url: params,
			});
		},
		applyAuth({ index, classIndex }) {
			this.goodsList[classIndex].goodsList[index].authorizeStatus = 1;
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	// padding-top: 188rpx;
	background: #fff;
	padding-top: calc(var(--status-bar-height) + 100rpx + 90rpx);
}
.fixed-wrap {
	position: fixed;
	left: var(--window-left);
	right: var(--window-right);
	top: 0;
	width: 100%;
	padding-top: var(--status-bar-height);
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
.nav-list {
	position: fixed;
	left: 0;
	width: 750rpx;
	top: calc(var(--status-bar-height) + 100rpx);
	height: 88rpx;
	background: #fff;
	box-shadow: 0rpx 5rpx 8rpx 0rpx rgba(219, 219, 219, 0.75);
	white-space: nowrap;
	overflow-x: auto;
	z-index: 999;
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
			font-size: 34rpx;
			font-weight: bold;
			color: #333;
			.border {
				opacity: 1;
			}
		}
	}
}
.main {
	height: calc(100vh - 188rpx - var(--status-bar-height));
	display: flex;
}
.class-list {
	width: 158rpx;
	height: 100%;
	background: #f4f4f4;
	.class-item {
		min-height: 107rpx;
		font-size: 30rpx;
		color: #666;
		background: #f4f4f4;
		border-bottom: 1rpx solid #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;

		&.active {
			color: #ff5d2b;
			background: #fff;
		}
	}
}
.goods-list-wrap {
	flex: 1;
	height: 100%;
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
</style>
