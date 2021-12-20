<template>
	<view class="container">
		<view class="header">
			<view class="title">
				设置新的手机号
			</view>
			<view class="sub_title">
				请输入新的手机号作为登录账号
			</view>
		</view>
		<view class="mian">
			<view class="phone_number">
				<text class="label" style="line-height: 70rpx;">手机号：</text>
				<input @input="checkout" @blur="handleBlur" class="number" maxlength="11" type="number"
					v-model.trim="phoneNumber" placeholder-style="font-size:34rpx;margin-top:4rpx" placeholder="请输入您的手机号" />
			</view>
			<view class="login_opreate">
				<button class="login_btn" @click="goNext" :style="btnStyle"
					type="default">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import setRequestVerification from '@/libs/secretRequest.js'
	export default {
		data() {
			return {
				phoneNumber: '',
				originPhone:'',
				canGoNext:false
			}
		},
		onLoad(options) {
			const dataStr = options.params
			const data = JSON.parse(decodeURIComponent(dataStr))
			this.originPhone = data.phone
		},
		computed:{
			btnStyle(){
				return this.canGoNext ? 'opacity:1':'opacity:0.6'
			}
		},
		methods: {
			checkout(e){
				let v = e.target.value
				this.canGoNext = v.length === 11
			},
			async goNext() {
				const phone = this.phoneNumber
				this.checkPhone(phone)
				if(!this.canGoNext) return
				const data = {
					phone,
				}
				const url = "/user/appUser/sendUpdatePhoneSms"
				const res = await this.$myRequest({
					method: "GET",
					url: url,
					data: data
				})
				if(res.success !== 1){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					return
				}else{
					uni.showToast({
						title:'验证码发送成功'
					})
				}
				const routeData = {
					phone,
					smsId:res.data.smsId
				}
				let timer = setTimeout(
					function () {
						this.$goPage('/pages/admin/inputCode',routeData)
					}.bind(this),
					2000
				);
			},
			handleBlur(){
				this.checkPhone(this.phoneNumber)
			},
			checkPhone(v){
				let reg = /^1[3-9]\d{9}$/;
				const oldP = this.originPhone;
				if(!reg.test(v)){
					uni.showToast({
						title: '请输入正确的手机号格式',
						icon: 'none'
					})
					this.canGoNext =false
					return
				}
				if( v === oldP){
					uni.showToast({
						title: '新旧手机号重复',
						icon: 'none'
					})
					this.canGoNext =false
					return
				}
				this.canGoNext =true
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 640rpx;
		margin: 0 auto;
	}

	.header {
		height: 335rpx;

		.title {
			font-size: 54rpx;
			font-weight: 700;
			text-align: left;
			color: #222222;
			padding-top: 71rpx;
		}

		.sub_title {
			font-size: 30rpx;
			text-align: left;
			color: #666666;
			padding-top: 31rpx;
		}
	}

	.mian {
		height: 335rpx;

		.phone_number {
			height: 97rpx;
			display: flex;
			border-bottom: 2rpx solid #ebebeb;

			.label {
				font-size: 34rpx;
				text-align: left;
				color: #333333;
			}

			.number {
				font-size: 44rpx;
			}
		}

		.login_opreate {
			.login_btn {
				width: 640rpx;
				height: 100rpx;
				opacity: 0.6;
				background: #ff7247;
				border-radius: 50rpx;
				margin-top: 83rpx;
				color: #ffffff;
				font-size: 34rpx;
				font-weight: 600;
				line-height: 100rpx;
			}

			.opreate_footer {
				display: flex;
				margin-top: 50rpx;
				margin-left: 20rpx;
				font-size: 30rpx;

				.option_icon,
				.option_icon1 {
					width: 40rpx;
					height: 40rpx;
					border: 2rpx solid #aaaaaa;
					border-radius: 50%;
				}

				.option_icon {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.option_icon1 {
					background-color: #FF7247;
					border: none;
				}
			}
		}
	}


</style>
