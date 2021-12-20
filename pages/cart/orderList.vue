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
		<view class="order-list">
			<block v-for="(item, index) in list" :key="index">
				<template v-if="navIdx == 1 || navIdx == 4">
					<order-item
						:info="item.object"
						@cancelOrder="cancelOrder"
					></order-item>
				</template>
				<!-- 待收货和已完成状态订单，进行拆分，数据结构不同 -->
				<template v-if="navIdx == 0 || navIdx == 2 || navIdx == 3">
					<order-item
						:info="item"
						@cancelOrder="cancelOrder"
					></order-item>
				</template>
			</block>
		</view>
		<view v-if="list && list.length > 9">
			<uni-load-more :status="moreStatus"></uni-load-more>
		</view>
		<view
			class="no-data column flex-center-center"
			style="margin-top: 188rpx"
			v-if="!list || list.length == 0"
		>
			<image src="/static/images/cart/empty_order.png"></image>
			<text>暂无商品</text>
		</view>
	</view>
</template>

<script>
import moreListMixin from "@/mixins/moreList";
export default {
	mixins: [moreListMixin],
	data() {
		return {
			// 订单状态：0-待付款、1已取消、2-已支付、3已发货、4-已完成、5-全部
			navList: [
				{
					label: "全部",
					value: 5,
				},
				{
					label: "待付款",
					value: 0,
				},
				{
					label: "待收货",
					value: 3,
				},
				{
					label: "已完成",
					value: 4,
				},
				{
					label: "已取消",
					value: 1,
				},
			],
			navIdx: 0,
			list: [],
			pageNum: 1,
			timer: null,
			moreStatus: "more",
		};
	},
	onLoad(options) {
		this.navIdx = Number(options.index);
	},
	onShow() {
		setTimeout(() => {
			this.list = [];
			this.pageNum = 1;
			this.timer = null;
			this.moreStatus = "more";
			this.getList();
		});
	},
	onReachBottom() {
		this.getMoreList();
	},
	methods: {
		handleChange(index) {
			this.navIdx = index;
			this.list = [];
			this.pageNum = 1;
			this.moreStatus = "more";
			this.getList();
		},
		getMoreList() {
			if (this.timer) return;
			this.timer = setTimeout(() => {
				this.moreStatus = "loading";
				this.pageNum++;
				this.getList();
			}, 270);
		},

		async getList() {
			const type = this.navList[this.navIdx].value;
			const allType = this.navList[0].value;
			const obj = {
				pageNum: this.pageNum,
				pageSize: 10,
			};
			if (type !== allType) {
				obj.status = type;
			}
			const id = uni.getStorageSync("customerId");
			if (id) {
				obj.customerId = id;
			}
			this.startShowLoading();
			// 子订单拆分判断接口
			let url = "/order/orders/list";
			if (obj.status == 3 || obj.status == 4) {
				url = "/order/orders/subOrderList";
			} else if (this.navIdx === 0) {
				url = "/order/orders/allOrderList";
			}

			const res = await this.$myRequest({
				method: "POST",
				data: obj,
				url: url,
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
			this.initPageNum(list);
			this.initTimer();
			list = list && list.length ? list : [];
			const total = this.list.length;
			const num = total % 10;
			if (num > 0) {
				list.splice(0, num);
			}
			this.list = [...this.list, ...list];
		},
		cancelOrder(index) {
			(this.navIdx === 1 || this.navIdx === 2) &&
				this.list.splice(index, 1);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 118rpx 30rpx 30rpx;
	background: #f7f6f6;
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
	z-index: 100;
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
</style>
