<template>
	<view class="goods-item" :style="mrStyle" @tap="goDetail">
		<view class="img">
			<image :src="info.courseCover" mode="widthFix"></image>
		</view>
		<view class="goods-item-content">
			<view class="goods-title">{{ info.courseName }}</view>
			<view class="app-f app-f-aic">
				<view class="goods-amount app-f-f1 app-f app-f-fdc">
					<text space="emsp">{{ info.studyNum }}人在学</text>
					<view class="gary-font text-line-hide"
						>￥{{ info.price | formatePrice }}</view
					>
				</view>
				<view class="goods-label app-f app-f-aic app-f-jcc"
					>免费学习</view
				>
			</view>
		</view>
	</view>
</template>

<script>
import formatePriceMixin from "@/mixins/formatePrice";

export default {
	mixins: [formatePriceMixin],
	props: {
		info: {
			type: Object,
			default: {},
		},
		infoIdx: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		mrStyle() {
			return this.infoIdx % 2 === 0 ? "margin-right:30rpx" : "";
		},
	},
	methods: {
		goDetail() {
			this.$goPage("/pagesTool/course/playVideo", {
				courseId: this.info.id,
			});
		},
	},
};
</script>

<style lang="scss">
.goods-item {
	background-color: #ffffff;
	width: 310rpx;
	border-radius: 19rpx;
	margin-top: 30rpx;
}
.goods-item .img {
	width: 100%;
	height: 180rpx;
	border-radius: 16rpx;
	overflow: hidden;
	image {
		width: 100%;
	}
}

.goods-title {
	font-weight: bold;
	font-size: 30rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-bottom: 5rpx;
	margin-top: 20rpx;
}
.goods-amount {
	display: flex;
	align-items: baseline;
	font-size: 24rpx;
}
.goods-amount text {
	color: #666;
}
.goods-amount view {
	color: #000;
	font-weight: bold;
	margin-top: 14rpx;
}
.goods-label {
	width: 144rpx;
	height: 54rpx;
	background: #ff7247;
	border-radius: 27rpx;
	font-size: 24rpx;
	color: #fff;
}
</style>
