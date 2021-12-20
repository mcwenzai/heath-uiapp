<template>
	<view class="modal-wrap" v-if="show">
		<view class="modal">
			<view class="modal-title">
				<text space="ensp">{{ title }}</text>
			</view>
			<text class="flex modal-content">
				{{ content }}
			</text>
			<view class="modal-btn">
				<view @tap="handleCancel">{{ cancelTxt }}</view>
				<view @tap="handleConfirm">{{ confirmTxt }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "my-show-modal",
	props: {
		show: {
			default: false,
			type: Boolean,
		},
		title: {
			default: "提示",
			type: String,
		},
		content: {
			default: "",
			type: String,
		},
		cancelTxt: {
			default: "取消",
			type: String,
		},
		confirmTxt: {
			default: "确认",
			type: String,
		},
	},
	data() {
		return {};
	},
	methods: {
		handleCancel() {
			this.$emit("cancel");
		},
		handleConfirm() {
			this.$emit("confirm");
		},
	},
};
</script>

<style lang="scss" scoped>
.modal-wrap {
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	height: 100vh;
	width: 100vw;
	z-index: 99999;
	.modal {
		width: 80vw;
		// min-height: 400rpx;
		background-color: #fff;
		border-radius: 20rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
		text-align: center;
		.modal-title {
			padding: 30rpx;
			font-weight: 500;

			font-size: 40rpx;

			color: #333333;
		}
		.modal-content {
			padding: 0 30rpx 20rpx;
			color: #666;
			min-height: 120rpx;

			display: flex;
			justify-content: center;

			font-size: 32rpx;
			line-height: 48rpx;
			margin-bottom: 90rpx;
			width: 100%;
		}
		.modal-btn {
			display: flex;
			align-items: center;
			position: absolute;
			height: 100rpx;
			bottom: 0;
			width: 100%;
			border-top: 1rpx solid #ddd;
			view {
				flex: 1;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;

				font-size: 34rpx;
			}
			view:first-child {
				border-right: 1rpx solid #ddd;
				color: #666;
			}
			view:last-child {
				color: #ff7247;
			}
		}
	}
}
</style>
