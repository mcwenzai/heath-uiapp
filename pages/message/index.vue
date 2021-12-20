<template>
	<view class="content page-height">
		<view class="message-list">
			<template v-if="list && list.length">
				<block v-for="(item, index) in list" :key="index">
					<view
						class="message-item flex-between-center"
						@click="handleDetail(item)"
					>
						<view style="flex: 1">
							<view class="title"
								><text
									class="dot"
									v-if="item.readStatus === 0"
								></text
								>{{ item.title }}</view>
							<text class="text">{{ item.content }}</text>
						</view>
						<image
							src="/static/images/arrow_left.png"
							class="small-arrow-icon"
							mode="aspectFit"
						></image>
					</view>
				</block>
			</template>
			<template v-else>
				<view style="margin-top: 300rpx; text-align: center">
					暂无消息
				</view>
			</template>
		</view>
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
		};
	},
	onLoad() {},
	onShow() {
		this.pageNum = 1;
		this.timer = null;
		this.moreStatus = "more";
		this.getList();
	},

	onReachBottom() {
		this.getMoreList();
	},
	methods: {
		handleDetail(obj) {
			uni.navigateTo({
				url: "/pages/message/detail?messageId=" + obj.id,
			});
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
			const isDetail = uni.getStorageSync("messageDetail");
			// if (!isDetail) {
			// 	this.startShowLoading();
			// }
			const res = await this.$myRequest({
				url: "/user/userMessage/list",
				data: {
					pageNum: this.pageNum,
					pageSize: 10,
				},
			});

			if (isDetail && this.pageNum === 1) {
				this.list = [];
				uni.removeStorageSync("messageDetail");
			}

			// this.endHideLoading();
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
	},
};
</script>

<style lang="scss" scoped>
.content {
	padding: 30rpx;
	background: #f7f6f6;
}
.message-item {
	position: relative;
	margin-bottom: 30rpx;
	padding: 30rpx;
	background: #ffffff;
	border-radius: 10rpx;
	.title {
		margin-bottom: 10rpx;
		color: #333333;
		font-size: 34rpx;
		.dot {
			display: inline-block;
			margin: 0 10rpx 5rpx 0;
			width: 14rpx;
			height: 14rpx;
			border-radius: 50%;
			background: #ff7247;
		}
	}
	.text {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		color: #666666;
		font-size: 30rpx;
		line-height: 45rpx;
	}
	.warning-icon {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		width: 28rpx;
		height: 32rpx;
	}
}
</style>
