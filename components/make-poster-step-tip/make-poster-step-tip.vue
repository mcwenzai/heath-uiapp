<template>
	<view class="tip-wrap app-f app-f-aic app-f-jcc" :style="tipStyle" v-if="show" style="width: 60rpx;height:60rpx">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:"make-poster-step-tip",
		props:{
			show:{
				default:false,
				type:Boolean
			},
			position:{
				default:'top',
				type:String
			},
		},
		data() {
			return {
				
			};
		},
		computed:{
			tipStyle(){
				const v= this.position
				if(v === 'top') return `top:-40rpx`
				if(v === 'bottom') return 'bottom:-40rpx'
			}
		}
	}
</script>

<style lang="scss" scoped>
.tip-wrap{
	width: 60rpx;
	height: 60rpx;
	
	background: linear-gradient(-21deg,#ff9e20 0%, #ffc038 100%);
	box-shadow: 0px 17rpx 20rpx 1rpx rgba(163,92,0,0.22); 
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	border-radius: 50%;
	color: #fff;
}
</style>
