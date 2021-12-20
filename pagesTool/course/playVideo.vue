<template>
	<view class="container">
		<view class="video-play">
			<video
				id="myVideo"
				:src="videoSrc"
				:poster="posterUrl"
				@play="videoPlay"
				@pause="videoPause"
				@ended="videoEnd"
				play-btn-position="center"
				:enable-play-gesture="true"
				v-if="posterUrl"
			></video>
		</view>
		<view class="introduction">
			{{ list[videoIndex] && list[videoIndex].sectionName }}
		</view>
		<view class="content">
			<view class="app-f app-f-aic tab-wrap">
				<view
					@tap="changeShowContent(0)"
					:class="[
						'app-f-f1 app-f app-f-aic app-f-jcc tab-item ',
						showContent === 0 ? 'tab-item-active' : '',
					]"
					>课程介绍
					<view
						class="tab-active-line"
						v-show="showContent === 0"
					></view>
				</view>
				<view
					@tap="changeShowContent(1)"
					:class="[
						'app-f-f1 app-f app-f-aic app-f-jcc tab-item ',
						showContent === 1 ? 'tab-item-active' : '',
					]"
					>章节目录<view
						class="tab-active-line"
						v-show="showContent === 1"
					></view
				></view>
			</view>
			<view class="tab-content">
				<view v-show="showContent === 0">
					<play-video-introduction
						:list="imgs"
					></play-video-introduction>
				</view>
				<view v-show="showContent === 1">
					<play-video-list
						@clickItem="clickPlayItem"
						:list="list"
					></play-video-list>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import playVideoIntroduction from "./components/playVideoIntroduction.vue";
import playVideoList from "./components/playVideoList.vue";
export default {
	data() {
		return {
			showContent: 0,
			videoContext: null,
			videoSrc: "",
			posterUrl: "",
			list: [],
			imgs: [],
			videoIndex: 0,
			// 播放状态 0 未播放，1 播放中，2 暂停，
		};
	},
	components: {
		playVideoIntroduction,
		playVideoList,
	},
	onLoad(options) {
		const dataStr = options.params;
		if (dataStr) {
			const id = JSON.parse(decodeURIComponent(dataStr)).courseId;
			this.getDetail(id);
		}
	},
	onReady: function (res) {
		this.videoContext = uni.createVideoContext("myVideo");
	},
	methods: {
		changeShowContent(type) {
			this.showContent = type;
		},
		clickPlayItem(index) {
			const list = this.list;
			const currentIndex = this.videoIndex;
			const obj = list[index];
			if (index === currentIndex) {
				if (obj.isPlaying === 2) {
					obj.isPlaying = 1;
					this.videoContext.play();
				} else if (obj.isPlaying === 1) {
					obj.isPlaying = 2;
					this.videoContext.pause();
				} else {
					obj.isPlaying = 1;
					this.videoContext.play();
				}
			} else {
				this.videoContext.stop();

				list[currentIndex].isPlaying = 0;
				obj.isPlaying = 1;
				this.videoSrc = obj.sectionUrl;
				this.videoIndex = index;
				this.$nextTick(() => {
					this.videoContext.play();
				});
			}
		},
		async getDetail(id) {
			const res = await this.$myRequest({
				url: "/course/specialCourse/courseDetail",
				data: {
					courseId: id,
				},
			});
			if (res.success !== 1) {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
				return;
			}

			const info = res.data || {};
			const list = info.sectionList || [];
			list.forEach((item) => {
				item.isPlaying = 0;
			});
			uni.setNavigationBarTitle({
				title:
					info.specialCourse && info.specialCourse.courseName
						? info.specialCourse.courseName
						: "课程详情",
			});
			this.list = list;
			this.videoSrc =
				list[0] && list[0].sectionUrl ? list[0].sectionUrl : "";

			this.posterUrl =
				info.specialCourse && info.specialCourse.courseCover
					? info.specialCourse.courseCover
					: "";
			const imgStr =
				info.specialCourse && info.specialCourse.courseIntro
					? info.specialCourse.courseIntro
					: "";

			if (imgStr) {
				this.imgs = imgStr.split(",");
			}
		},
		videoPlay() {
			this.list[this.videoIndex].isPlaying = 1;
		},
		videoPause() {
			this.list[this.videoIndex].isPlaying = 2;
		},

		videoEnd() {
			const list = this.list;
			let len = list.length;
			const index = this.videoIndex;
			if (index < len - 1) {
				const j = index + 1;
				list[index].isPlaying = 0;
				list[j].isPlaying = 1;
				this.videoSrc = list[j].sectionUrl;
				this.videoIndex = j;
				this.$nextTick(() => {
					this.videoContext.play();
				});
			} else {
				list[index].isPlaying = 0;
			}
		},
	},
};
</script>

<style>
page {
	background: #fff;
}
</style>

<style lang="scss" scoped>
.container {
	background: #f7f7f7;
}
.video-play {
	width: 100%;
	video {
		width: 750rpx;
		height: 420rpx;
	}
}
.introduction {
	padding: 32rpx;
	background-color: #fff;
	font-weight: bold;
	font-size: 32rpx;
	margin-top: -10rpx;
}
.content {
	background-color: #fff;
	border-radius: 30rpx 30rpx 0 0;
	margin-top: 20rpx;
	padding: 15rpx;
	.tab-wrap {
		padding: 20rpx;
		border-bottom: 1rpx solid #d7d7d7;
		.tab-item {
			position: relative;
			color: #666;
			font-size: 32rpx;
			.tab-active-line {
				width: 40rpx;
				height: 4rpx;
				background: #ff7247;
				border-radius: 2rpx;
				position: absolute;
				bottom: -20rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
		.tab-item-active {
			color: #ff7247;
			font-weight: bold;
		}
	}
	.tab-content {
		padding-top: 10rpx;
	}
}
</style>
