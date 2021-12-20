<template>
	<view class="page-wrap">
		<scroll-view scroll-y="true" class="container">
			<view class="content">
				<image :src="info.imgUrl" mode="widthFix"></image>
				<view class="title">
					{{info.name}}
				</view>
				<view class="item">
					<view class="item-title app-f app-f-aic">
						<view></view> 国际代码
					</view>
					<view class="item-content">{{info.code || ''}}</view>
				</view>
				<view class="item">
					<view class="item-title app-f app-f-aic">
						<view></view> 特定穴
					</view>
					<view class="item-content">{{info.specificAcupoint || ''}}</view>
				</view>
				<view class="item">
					<view class="item-title app-f app-f-aic">
						<view></view> 定位
					</view>
					<view class="item-content">{{info.location || ''}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{}
			};
		},
		onLoad(options) {
			const data = options.params
			if (data) {
				// console.log(options)
				 this.info = JSON.parse(decodeURIComponent(data))
				// console.log(data)
				uni.setNavigationBarTitle({
				    title: this.info.name
				});
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		.content {
			padding-bottom: 30rpx;
			>image{
				width: 750rpx;
				// height: 400rpx;
				border-bottom: 1rpx solid #f1f1f1;
			}
			.title{
				
				font-size: 36rpx;
			
				font-weight: 600;
				text-align: center;
				color: #ff9e20;
				padding: 28rpx 0 5rpx;
			}
			.item{
				margin-top: 30rpx;
				padding: 0 30rpx;
				.item-title{
					color: #ff9e20;
					background-color: #FFF2DE;
					padding: 18rpx 20rpx;
					border-radius: 8rpx;
					view{
						width: 12rpx;
						height: 12rpx;
						margin-right: 10rpx;
						border: 2rpx solid #ff9e20;
						border-radius: 50%;
						font-size: 28rpx;
					}
				}
				.item-content{
					
					font-size: 30rpx;
					color: #666;
					padding: 20rpx 10rpx 0;
				}
			}
			
		}
	}
</style>
