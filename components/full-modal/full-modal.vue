<template>
	<view class="preview-wrap app-f app-f-aic app-f-jcc app-f-fdc" v-if="showModal">
		<scroll-view class="preview" scroll-y="true">
			<slot name='content'></slot>
		</scroll-view>
		<image v-if="showCloseBtn" src="/static/images/close-modal.png" @tap="$emit('closeModal')" class="close-preview"></image>
		<view class="bottom-wrap" v-else>
			<slot name='footer'></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: "fullModal",
		props: {
			showModal: {
				default: false,
				type: Boolean
			},
			showCloseBtn:{
				default:true,
				type:Boolean
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.preview-wrap {
		position: fixed;
		z-index: 999;
		height: calc(100vh + 80px);
		width: 100vw !important;
		background-color: rgba(0, 0, 0, 0.5) !important;
		// background-color: #000;
		top: 0;
		left: 0;
		

		.close-preview {
			width: 70rpx;
			height: 70rpx;

			margin-top: 30rpx;

			background-color: #8e8e8e;
			border-radius: 50%;
		}
		
		.bottom-wrap{
			margin-top: 5rpx;
			
			background-color: #fff;
			width: 560rpx;
			border-radius: 10rpx;
			padding: 20rpx;
		}
		
	}
	.preview {
		// margin-top: -100rpx;
		width: 560rpx;
		max-height: 60vh;
		background: #ffffff;
		
		border-radius: 20rpx;
		
		border:20rpx solid #fff;
		
		
	}
</style>
