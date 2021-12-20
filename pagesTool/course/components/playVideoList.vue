<template>
	<view class="list-wrap">
		<block v-for="(item, index) in list" :key="index">
			<view
				:class="[
					'item app-f app-f-aic',
					item.isPlaying > 0 ? 'item-active' : '',
				]"
				@tap="clickItem(index)"
			>
				<view class="left">{{ item.sectionName }} </view>
				<view class="right app-f app-f-aic app-f-jcc">
					<image
						:src="
							item.isPlaying === 1
								? '/static/images/video/playing.png'
								: item.isPlaying === 0
								? '/static/images/video/play.png'
								: '/static/images/video/pause.png'
						"
					></image>
					<view>{{
						item.isPlaying === 1
							? "播放中"
							: item.isPlaying === 0
							? "播放"
							: "暂停"
					}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	props: {
		list: {
			default: [],
			type: Array,
		},
	},

	methods: {
		clickItem(index) {
			this.$emit("clickItem", index);
		},
	},
};
</script>

<style scoped lang="scss">
.list-wrap {
	padding-bottom: 100rpx;
	background-color: #fff;
}
.item {
	padding: 40rpx 0;
	border-bottom: 1rpx solid #d7d7d7;
	margin: 0 25rpx;
	.left {
		width: 460rpx;
		margin-right: 50rpx;
		font-size: 32rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;

		vertical-align: middle;
	}
	.right {
		image {
			height: 48rpx;
			width: 48rpx;
			margin-right: 16rpx;
		}
		text {
			font-size: 24rpx;
		}
	}
}
.item-active {
	color: #ff7247;
}
</style>
