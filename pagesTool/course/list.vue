<template>
	<view class="container">
		<view class="class-content app-f app-f-fww">
			<block v-for="(item, index) in list" :key="index">
				<mk-video-item :infoIdx="index" :info="item"></mk-video-item>
			</block>
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
			specialId: "",
		};
	},
	onLoad(options) {
		const dataStr = options.params;
		if (dataStr) {
			const id = JSON.parse(dataStr).specialId;
			this.specialId = id;
			this.getList();
		}
	},
	methods: {
		async getList() {
			uni.showLoading({
				title: "加载中",
			});
			// 子订单拆分判断接口
			const res = await this.$myRequest({
				data: {
					specialId: this.specialId,
				},
				url: "/course/specialCourse/specialCourseList",
			});
			uni.hideLoading();
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}
			let list = res.data.courseList || [];
			uni.setNavigationBarTitle({
				title: res.data.special.specialName || "课程列表",
			});
			this.list = list;
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	margin: 30rpx;

	.class-content {
		background-color: #fff;
		padding: 0 20rpx 30rpx;
	}
}
</style>
