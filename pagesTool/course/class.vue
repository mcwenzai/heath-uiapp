<template>
	<view class="container">
		<block v-for="(item, index) in list" :key="index">
			<view class="class-item" v-if="item && item.courseList.length">
				<view class="class-title app-f app-f-aic app-f-jcsb">
					<view class="class-title-title">{{
						item.specialName
					}}</view>
					<view
						class="app-f app-f-aic app-f-jcc"
						v-if="item.isMore"
						@tap="goList(item)"
						>更多 ></view
					>
				</view>

				<view class="class-content app-f">
					<template v-if="item && item.courseList.length">
						<block
							v-for="(item1, index1) in item.courseList"
							:key="index1"
						>
							<mk-video-item
								:infoIdx="index1"
								:info="item1"
							></mk-video-item>
						</block>
					</template>
				</view>
			</view>
		</block>

		<view class="loading_over" v-show="list.length > 5">
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
			pageSize: 6,
		};
	},
	onLoad() {
		this.getList();
	},
	onReachBottom() {
		this.getMoreList();
	},
	methods: {
		goList(item) {
			this.$goPage("/pagesTool/course/list", { specialId: item.id });
		},
		getMoreList() {
			if (this.timer || this.list.length < 6) return;

			this.timer = setTimeout(() => {
				this.moreStatus = "loading";
				this.pageNum++;
				this.getList();
			}, 270);
		},

		async getList() {
			const obj = {
				pageNum: this.pageNum,
				pageSize: this.pageSize,
			};

			this.startShowLoading();
			// 子订单拆分判断接口

			const res = await this.$myRequest({
				data: obj,
				url: "/course/specialCourse/specialList",
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
			const num = total % this.pageSize;
			if (num > 0) {
				list.splice(0, num);
			}
			this.list = [...this.list, ...list];
		},
		initPageNum(list) {
			if (this.pageNum > 1 && (!list || list.length < this.pageSize)) {
				this.moreStatus = "noMore";
				this.pageNum--;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	padding-bottom: calc(20rpx + constant(safe-area-inset-bottom));
	padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
.class-item {
	margin: 30rpx;
	border-radius: 30rpx 30rpx 10rpx 10rpx;
	overflow: hidden;
	.class-title {
		padding: 0 16rpx 16rpx;
		height: 80rpx;
		background: linear-gradient(135deg, #ffb040 0%, #ff7247 100%);
		border-radius: 30rpx 30rpx 0 0;
		color: #fff;

		view {
			font-size: 30rpx;
		}
	}
	.class-content {
		padding: 0 30rpx 30rpx;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		margin-top: -16rpx;
	}
	.class-title-title {
		width: 550rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30rpx;
	}
}
</style>
