<template>
	<view class="content page-height">
		<view class="total-wrap column flex-center-center">
			<text>积分余额</text>
			<text class="total">{{ totalCount }}</text>
		</view>
		<block v-for="(item, index) in list" :key="index">
			<view class="integral-item column">
				<view class="item-up flex-between-center">
					<text class="title">{{
						item.integral > 0 ? "下单赠送" : "购买抵扣"
					}}</text>
					<text class="integral">{{
						item.integral > 0 ? "+" + item.integral : item.integral
					}}</text>
				</view>
				<text class="time">{{ item.createTime }}</text>
			</view>
		</block>
		<view v-if="list && list.length > 9">
			<uni-load-more :status="moreStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
import moreListMixin from "@/mixins/moreList";
export default {
	mixins: [moreListMixin],
	data() {
		return {
			list: [],
			totalCount: 0,
		};
	},
	onLoad(options) {
		this.totalCount = options.intergralNum || 0;

		this.getList();
	},
	onReachBottom() {
		this.getMoreList();
	},
	methods: {
		async getList() {
			this.startShowLoading();
			const obj = {
				pageNum: this.pageNum,
				pageSize: 10,
			};
			// console.log(obj)
			const res = await this.$myRequest({
				url: "/user/userIntegralRecord/list",
				data: obj,
				method: "POST",
			});
			this.endHideLoading();
			// console.log(res);
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
				this.getList();
			}, 270);
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	background: #f7f6f6;
	padding-bottom: 20rpx;
}
.total-wrap {
	height: 188rpx;
	color: #fff;
	font-size: 30rpx;
	background: linear-gradient(141deg, #fa683f 0%, #ffd376 100%);
	.total {
		font-weight: bold;
		font-size: 60rpx;
	}
}
.integral-item {
	position: relative;
	margin: 20rpx 30rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	.title {
		font-size: 32rpx;
		color: #333;
		font-weight: bold;
	}
	.integral {
		font-size: 36rpx;
		color: #ff7247;
	}
	.time {
		margin-top: 10rpx;
		font-size: 24rpx;
		color: #666;
	}
}
</style>
