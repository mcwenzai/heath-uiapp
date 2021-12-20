<template>
	<view class="page-wrap">
		<top-navigation-bar ></top-navigation-bar>
		<scroll-view scroll-y="true" class="container" :style="containerStyle">

			<view class="input-wrap">
				<view class="input-item app-f app-aic">
					<view class="input-label">所申请医生：</view>
					<view class="input-con app-f1">
						{{info.doctorName}}
					</view>
				</view>
				<view class="input-item   app-f app-aic">
					<view class="input-label"><text class="required-tip">*</text>联系电话：</view>
					<view
						:class="['input-con phone-input app-f1 app-f app-aic ',inputPhoneFocus?'phone-input-active':'']">
						<input @blur="inputPhoneFocus=false" @focus="inputPhoneFocus=true" type="text" class="app-f1"
							placeholder="请输入手机号" v-model.trim="info.phone">
						<view class="del-phone" @tap="delPhone" v-show="info.phone">
							<image src="/static/images/comment/close.png"></image>
						</view>
					</view>
				</view>
				<view class="input-item app-f">
					<view class="input-label">注意事项：</view>
					<view class="input-con app-f1 warning-text">
						<view>
							1. 请仔细核对联系电话并保证畅通，一旦提交，将不能修改；
						</view>
						<view>
							2. 成功提交后，会有专人同您联系，请耐心等待；
						</view>
						<view>
							3. 此服务会产生一定费用；
						</view>
					</view>
				</view>
			</view>

			<view class="bottom-wrap">
				<view class="submit-btn app-f app-aic app-jcc" @tap="submitInfo">提交</view>
				<view class="cancel-btn app-f app-aic app-jcc" @tap="goBack">放弃</view>
			</view>

		</scroll-view>
<tip :title='tipText' v-if='showTip'></tip>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputPhoneFocus: true,
				info: {
					phone: '',
					remark:'',
					doctorName:'',
					doctorId:null
				},
				tipText:'',
				showTip:false
			};
		},
		onLoad(options) {
			const data =  JSON.parse(decodeURIComponent(options.params))
			// console.log(data)
			this.info.doctorId = data.doctorId
			this.info.doctorName= data.doctorName
			// console.log(this.info)
		},
		methods: {
			async submitInfo() {
				const reg= /^1[3-9]\d{9}$/
				if(!reg.test(this.info.phone)) return this.$tip('请输入正确的手机号')
				const userId = uni.getStorageSync('userInfo').id
				const res = await this.$myRequest({
					url:'/special/specialDoctorRegistration/registration',
					method:"POST",
					data:{
						...this.info,
						type:1,
						userId
					}
				})
				if(!res || res.success !==1) return this.$tip(res.msg)
				this.$goPage('/pagesSpecialComing/submitComingSuccess/submitComingSuccess')
			},
			goBack(){
				uni.navigateBack({
					delta:-1
				})
			}
			

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;

	}

	.input-wrap {
		padding: 0 30rpx;
		position: absolute;
		width: 750rpx;
		left: 0;
		top: 0;
		.input-item {
			margin-top: 50rpx;
			font-size: 34rpx;

			.input-label {
				width: 210rpx;
				text-align: right;

				.required-tip {
					color: #f40;
				}
			}

			.input-con {
				font-weight: bold;
			}

			.phone-input {
				border: 1rpx solid #ddd;
				padding: 20rpx 30rpx;
				border-radius: 10rpx;


				.del-phone {
					width: 80rpx;
					height: 42rpx;
					text-align: center;

					image {
						width: 42rpx;
						height: 42rpx;
					}
				}
			}

			.phone-input-active {
				border-color: #FF981E;
			}

			.warning-text {
				font-weight: normal;
				color: #666;
				
				view{
					margin-top: 10rpx;
				}
				view:first-child{
					margin-top: 0;
				}
			}
		}


	}

	.bottom-wrap {
		position: absolute;
		bottom: 30rpx;
		width: 710rpx;
		left: 50%;
		transform: translateX(-50%);

		view {
			height: 90rpx;
			width: 710rpx;

		}

		.submit-btn {

			background: linear-gradient(-30deg, #ff981e 0%, #ffc029 100%);
			border-radius: 44rpx;
			box-shadow: 0rpx 25rpx 36rpx 2rpx rgba(255, 151, 29, 0.19);
			color: #fff;
		}

		.cancel-btn {
			margin-top: 40rpx;
		}
	}
</style>
