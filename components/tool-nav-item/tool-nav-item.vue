<template>
	<view class="nav-item" @tap="clickNav">
		<view class="img-wrap app-f app-f-aic app-f-jcfe app-f-fdc">
			<view>
				<image class="face-img" :src="navData.imgUrl"></image>
				<image
					v-if="navData.isHot"
					class="hot-img"
					src="/static/images/tool/hot.png"
				></image>
				<image
					class="new-img"
					v-if="navData.isNew"
					src="/static/images/tool/new.png"
					mode=""
				></image>
			</view>
		</view>
		<view class="item-title app-f app-f-aic app-f-fdc">
			<view>{{ navData.title1 }}{{ navData.title2 }}</view>

		</view>
		<view
			class="tip-wrap app-f app-f-aic app-f-fdc app-f-jcc"
			v-show="showTip"
		>
			<view>工具正在开发中，</view>
			<view> 敬请期待！ </view>
		</view>
	</view>
</template>

<script>
export default {
	name: "tool-nav-item",
	props: {
		navData: {
			default: {},
			type: Object,
		},
		navIndex: {
			default: 0,
			type: Number,
		},
		navTotal: {
			default: 0,
			type: Number,
		},

		paIdx: {
			default: 0,
			type: Number,
		},
	},
	data() {
		return {
			showTip: false,
		};
	},
	computed: {
		navStyle() {
			const num = this.navIndex,
				total = this.navTotal;
			const numDif = num % 3,
				totalDif = total % 3;
			const bb = "border-bottom:1rpx solid #ebebeb;",
				br = "border-right:1rpx solid #ebebeb;";
			if (totalDif === 0) {
				if (num < total - 3) return numDif < 2 ? br + bb : bb;
				return numDif < 2 ? br : "";
			}
			if (num < total - totalDif) return numDif < 2 ? br + bb : bb;
			return br;
		},
	},
	methods: {
		clickNav() {
			const nav = this.navData;
			if (nav.disabled) {
				this.showTip = true;
				setTimeout(() => {
					this.showTip = false;
				}, 1000);
				return;
			}
			const option = {
				paIdx: this.paIdx,
				idx: this.navIndex,
				nav: {
					...nav,
				},
			};
			this.$emit("clickItem", option);
		},
	},
};
</script>

<style lang="scss" scoped>
.nav-item {
	text-align: center;
	box-sizing: border-box;
	font-size: 30rpx;
	width: 237rpx;
	height: 200rpx;
	color: #333333;

	.img-wrap {
		height: 130rpx;

		view {
			width: 100rpx;
			height: 100rpx;
			position: relative;

			.face-img {
				width: 100rpx;
				height: 100rpx;
				margin-top: 10rpx;
			}

			.hot-img,
			.new-img {
				position: absolute;
			}

			.hot-img {
				top: -10rpx;
				right: -10rpx;
				width: 58rpx;
				height: 71rpx;
			}

			.new-img {
				top: -0rpx;
				left: -15rpx;
				width: 57rpx;
				height: 49rpx;
			}
		}
	}

	.item-title {
		height: 50rpx;
		width: 100%;
		// border: 1rpx solid #ddd;
		padding-bottom: 10rpx;
		margin-top: 20rpx;
	}
}

.tip-wrap {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);

	font-size: 32rpx;

	width: 330rpx;
	height: 120rpx;

	background: #ff9e20;
	border-radius: 20rpx;
	color: #fff;
}
</style>
