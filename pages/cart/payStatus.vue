<template>
	<view class="content page-height flex-center-start">
		<view class="status flex-center-center column" v-if="stateType">
			<image src="/static/images/cart/success.png"></image>
			<text>支付成功</text>
		</view>
		<view class="status flex-center-center column" v-else>
			<image src="/static/images/cart/fail.png"></image>
			<text>支付失败</text>
		</view>
		<view class="btn" @click="orderDetail">
			查看订单
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stateType:null
			};
		},
		onLoad(data) {
			this.stateType = data.state
		},
		methods:{
			orderDetail(){
				if(this.stateType){
					uni.redirectTo({
						url:'/pages/cart/orderList?index=2'
					})
				}else{
					uni.redirectTo({
						url:'/pages/cart/orderList?index=1'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		width: 200rpx;
		height: 60rpx;
		background-color: #FF7247;
		margin: 80rpx auto;
		border-radius: 50rpx;
		line-height: 60rpx;
		text-align: center;
		color: #ffffff;
		letter-spacing: 4rpx;
	}
	.content {
		padding-top: 300rpx;
	}
	.status {
		font-size: 42rpx;
		font-weight: bold;
		color: #333;
		image {
			margin-bottom: 15rpx;
			width: 147rpx;
			height: 165rpx;
		}
	}
</style>
