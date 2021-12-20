<template>
	<view class="container">
		<view class="main">
			<view class="list_main" v-for="(item,index) in menusList" @click="goSetDetail(item)" :class="{noBorder:index==2}">
				<view class="title">
					{{item.title}}
				</view>
				<view class="arrow_left">

				</view>
			</view>
			<view class="footer">
				<view class="ys">注销账号：hedaifu@zhenheyiliao.cn</view>
				<view class="ys">将于3个工作日内处理完成</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				menusList:[
					{title:'用户协议',type:1},
					{title:'变更授权',type:3},
					{title:'隐私政策',type:2}
				],
			}
		},
		methods:{
			goSetDetail(param){
				if(param.type==1 || param.type==2){
					uni.navigateTo({
						url:'/pages/login/userAgreement?type=' + param.type
					})
				}else if(param.type==3){
					uni.navigateTo({
						url:'/userPages/setting/authChange'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F7F6F6;
	}
	.main{
		height: 320rpx;
		width: 690rpx;
		margin: 0 auto;
		margin-top: 30rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
	}
	.list_main{
		width: 630rpx;
		height: 110rpx;
		display: flex;
		align-items: center;
		margin: 0 auto;
		justify-content: space-between;
		border-bottom: 2rpx solid #EBEBEB;
		.title{
			font-size: 32rpx;
			color: #666666;
		}
		.arrow_left{
			width: 35rpx;
			height: 35rpx;
			background: url(../../static/images/arrow_left.png) no-repeat;
			background-size: 100% 100%;
		}
	}
	.noBorder{
		border: none;
	}
	.footer{
		width: 410rpx;
		height: 59rpx;
		font-size: 24rpx;
		font-weight: 400;
		position: fixed;
		left: 50%;
		top:94%;
		transform: translate(-50%,-50%);
		.ys {
			display: flex;
			justify-content: center;
			line-height: 42upx;
			color: #999999;
		}
	}
</style>
