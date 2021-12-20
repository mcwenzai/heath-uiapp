<template>
	<view class="container">
		<view class="header">
			<view class="title">
				输入4位验证码
			</view>
			<view class="sub_title">
				验证码已发送到您的手机号 
				<view style="margin-top: 20rpx;">
					{{phoneNum}}
				</view>
			</view>
		</view>
		<view class="mian">
			<view class="phone_number">
				<text class="label" style="line-height: 70rpx;">验证码：</text>
				 <u-message-input style="margin-top: -20rpx;" active-color='#FF7247' mode="bottomLine" v-model="verCode" @finish="finish"></u-message-input>
			</view>
			<view class="login_opreate">
				<button class="login_btn" @click="getCode2()" type="default">{{text}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	import setRequestVerification from '@/libs/secretRequest.js'
	export default{
		data(){
			return{
				verCode:'',
				phoneNum:'',
				timeClose:'',
				timer: null,
				text: '获取验证码',
				status: false,
				num: 60,
				smsId:''
			}
		},
		onLoad:function(options) {
			// 获取到前一个页面的参数
			const dataStr = options.params
			const data = JSON.parse(decodeURIComponent(dataStr)) 
			this.phoneNum = data.phone
			this.smsId = data.smsId
			// console.log(data)
			// 调用倒计时
			this.getCode()
		},
		methods:{
			// 倒计时开始接口
			getCode(){
				this.status = true;
				this.loading();
				this.timer = setInterval(() => {
					if (this.num === 0) {
						this.timer && this.clearTimer();
						this.reset();
					} else {
						this.loading();
					}
				}, 1000);
			},
			// 重新获取点击
			getCode2(){
				if(this.status == false){
					this.getCode()
					// this.getVerCode(this.phoneNum)
					uni.$emit('anewVer',{param:this.phoneNum})
				}else{
					uni.showToast({
						title:'请勿频繁操作',
						icon:'none'
					})
				}
			},
			reset() {
				this.num = 60;
				this.status = false;
				this.text = '重新获取';
			},
			loading() {
				this.num -= 1;
				this.text = this.num + 's';
			},
			clearTimer() {
				clearInterval(this.timer);
				this.timer = null;
			},
			// 验证码填写完成
			finish(e){
				// console.log(e);
				// 自动执行登录
				this.updatePhone(e)
			},
			// 登录接口
			async updatePhone(param){
				const info = uni.getStorageSync('userInfo')
				const data = {
					code: param,
					phone:this.phoneNum,
					smsId:this.smsId,
					userId:info.id
				}
				uni.showLoading({
					title:'提交中'
				})
				const res = await  this.$myRequest({
					url: "/user/appUser/updatePhone" ,
					data:data
				})
				uni.hideLoading()
				// console.log('修改手机号',res)
				if(res.success !== 1){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					return
				}
				
				// 清除倒计时
				this.timer && this.clearTimer();
				this.reset();
				uni.setStorageSync('userInfo',res.data)
				uni.navigateBack({
					delta:2
				})
			},
		}
	}
</script>

<style lang="scss">
	.container{
		width: 640rpx;
		margin: 0 auto;
	}
	.header{
		height: 335rpx;
		.title{
			font-size: 54rpx;
			font-weight: 700;
			text-align: left;
			color: #222222;
			padding-top: 71rpx;
		}
		.sub_title{
			font-size: 30rpx;
			text-align: left;
			color: #666666;
			padding-top: 31rpx;
		}
	}
	.mian{
		height: 335rpx;
		.phone_number{
			width: 600rpx;
			height: 97rpx;
			display: flex;
			.label{
				font-size: 34rpx;
				text-align: left;
				color: #333333;
			}
		}
		.login_opreate{
			.login_btn{
				width: 640rpx;
				height: 100rpx;
				background: #ff7247;
				border-radius: 50rpx;
				margin-top: 83rpx;
				color: #ffffff;
				font-size: 34rpx;
				font-weight: 600;
				line-height: 100rpx;
			}
		}
	}
</style>
