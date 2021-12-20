<template>
	<view class="container">
		<view class="header">
			<view class="title">
				 设置新的{{title}}
			</view>
		</view>
		<view class="mian">
			<view class="mian_content">
				<text class="label" style="line-height: 70rpx;">{{title}}：</text>
				<input maxlength="10" @input="checkout" class="number" type="text" placeholder-style="font-size:34rpx;margin-top:4rpx" v-model="value" :placeholder="placeholderText"/>
			</view>
			<view class="login_opreate">
				<button class="login_btn" @click="save()" :style="{opacity:!subState?'1':'0.6'}" type="default">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {fnThrottle} from '@/libs/tool'
	export default{
		data(){
			return{
				value:'',
				title:'',
				placeholderText:'',
				subState:true
			}
		},
		onLoad(data) {
			this.title =data.label
			this.placeholderText = '请输入您的' + data.label
		},
		created() {
			this.save = fnThrottle(this.save, 1000)
		},
		methods:{
			checkout(e){
				let value = e.detail.value
				let myreg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/
				if(!value) return
				if (myreg.test(value)) {
					this.subState = false
				}else{
					uni.showToast({
						title: '只能输入文字、数字、英文字符',
						icon: 'none'
					})
					this.subState = true
				}
			},
			async save(){
				if(this.subState) return
				uni.showLoading()
				let data = uni.getStorageSync('userInfo')
				let divisionData = uni.getStorageSync('divisionData')
				if(divisionData){
					data = divisionData
				}
				const res = await this.$myRequest({
					method: "POST",
					url: "/user/appUser/update",
					data:{
						name:this.value,
						id:data.id
					},
				})
				if(res.success !== 1){
					uni.showToast({
						title:res.msg,
						icon:'none'
					})
					return
				}else{
					uni.showToast({
						title:'修改成功'
					})
				}
				uni.setStorageSync('userInfo',res.data)
				let timer = setTimeout(
					function () {
						uni.navigateBack({data:1})
						uni.hideLoading()
					}.bind(this),
					2000
				);


			}
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
		// background-color: #F29100;
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
		// background-color: #55ff7f;
		.mian_content{
			height: 97rpx;
			// background-color: #DD6161;
			display: flex;
			border-bottom: 2rpx solid #ebebeb;
			.label{
				font-size: 34rpx;
				text-align: left;
				color: #333333;
			}
			.number{
				font-size: 44rpx;
			}
		}
		.login_opreate{
			.login_btn{
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
			.opreate_footer{
				display: flex;
				margin-top: 50rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
				.option_icon, .option_icon1{
					width: 40rpx;
					height: 40rpx;
					border: 2rpx solid #aaaaaa;
					border-radius: 50%;
				}
				.option_icon1{
					background-color: #FF7247;
					border: none;
				}
			}
		}

	}
	.footer{
		margin-top: 259rpx;
		height: 200rpx;
		// background-color: #55ffff;
		.quick_login{
			height: 187rpx;
			width: 200rpx;
			margin: 0 auto;
			// background-color: #55ffff;
			image{
				margin-top: 38rpx;
				width: 110rpx;
				height: 110rpx;
				margin-left: 40rpx;
			}
		}
	}
	.remind{
		width: 619rpx;
		height: 406rpx;
		background: #ffffff;
		border: 2rpx solid #dcdcdc;
		border-radius: 20rpx;
		box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(160,160,160,0.24);
		position: absolute;
		left: 50%;
		top:20%;
		transform: translateX(-50%);
		.title{
			height: 120rpx;
			font-size: 40rpx;
			font-weight: 700;
			text-align: center;
			line-height: 140rpx;
			letter-spacing: 20rpx;
		}
		.content{
			font-size: 32rpx;
			padding: 0 70rpx;
			height: 130rpx;
			color: #333333;
			line-height: 50rpx;
		}
		.opreate{
			border-top: 2rpx solid #DCDCDC;
			font-size: 34rpx;
			font-weight: 700;
			color: #ff7247;
			text-align: center;
			line-height: 100rpx;
		}
	}
</style>
