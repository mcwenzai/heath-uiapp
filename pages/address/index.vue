<template>
	<view class="container">
		<!-- 自定义导航栏 -->
		<u-navbar :is-back="false" title="" :background="background"></u-navbar>
		<view class="header">
			<view class="title">
				{{title}}
			</view>
			<view class="sub_title" style="color: #C1A86D;">
				非诊所经营者请选择您的位置
			</view>
		</view>
		<view class="mian">
			<view class="phone_number">
				<text class="label" style="line-height: 70rpx;">当前所选位置：</text>
				<view class="content">
					<input disabled="true" class="number" v-if="!cityInfo.addressName" type="text"
						placeholder-style="margin-top:4rpx;font-size:34rpx;color:#BBBBBB;font-weight:400" v-model="cityInfo.addressName"
						placeholder="未开启定位" />
					<view class="number" v-if="cityInfo.addressName" style="font-size: 42rpx;">{{cityInfo.addressName}}</view>
					<image style="width: 43rpx;height: 43rpx;" @click="showAddress=true"
						src="../../static/images/editor.png" mode=""></image>
				</view>
			</view>
			<view class="login_opreate">
				<button class="login_btn" @click="openModel()" type="default">保存</button>
			</view>
		</view>
		<view class="footer" @click="showModel2 = true">退出</view>
		<u-picker confirm-color="#FF7247" v-model="showAddress" mode="region" @confirm="confirmAddress"></u-picker>
		<u-modal title='提 示' @confirm.once="saveAddress()" @cancel="showModel=false" :cancel-style='cancelStyle'
			negative-top='160' v-model="showModel" :confirm-style='confirmStyle' :content-style='contentStyle'
			:title-style='titleStyle' :mask-close-able='true' :show-cancel-button='true' confirm-color="#FF7247"
			cancel-color="#999999" :content="content"></u-modal>
		<u-modal title='提 示' @confirm="loginOut()" @cancel="showModel2=false" :cancel-style='cancelStyle'
			negative-top='160' v-model="showModel2" :confirm-style='confirmStyle' :content-style='contentStyle'
			:title-style='titleStyle' :mask-close-able='true' :show-cancel-button='true' confirm-color="#FF7247"
			cancel-color="#999999" content="是否确定退出？"></u-modal>
	</view>
</template>

<script>
	import { fnThrottle } from "@/libs/tool";
	export default {
		data() {
			return {
				title: '请选择您的诊所位置',
				showAddress: false,//手动选择地址弹窗
				showModel: false,//保存地址模态框
				showModel2: false,//退出登录模态框
				content: '诊所位置一旦保存，将不可修改！',
				titleStyle: {
					fontWeight: 600,
					fontSize: '40rpx'
				},
				contentStyle: {
					fontSize: '32rpx',
					marginTop: '20rpx',
					marginBottom: '80rpx'
				},
				confirmStyle: {
					borderLeft: '2rpx solid #DCDCDC',
					fontWeight: 600,
					fontSize: '34rpx'
				},
				cancelStyle: {
					borderLeft: '2rpx solid #DCDCDC',
					fontWeight: 600,
					fontSize: '34rpx'
				},
				text: '',
				cityInfo:{
					addressName:null,
					cityCode:''
				},
				background:{
					backgroundColor:'#f7fafc'
				}
			}
		},
		onHide() {
			uni.hideLoading()
		},
		created() {
			this.saveAddress = fnThrottle(this.saveAddress, 1000);
		},
		onLoad() {
			//#ifdef APP-PLUS
			uni.showLoading({
				title:'获取当前定位中',
			})
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: function(res) {
					if (!res.address) return uni.showToast({title: '获取位置失败，请手动选择',icon: 'none'})
					let addressObj = res.address
					uni.hideLoading()
					this.getCityList(addressObj)
				}.bind(this),
				fail:function(err) {
					uni.hideLoading()
					uni.showToast({title: '获取定位失败，请手动选择位置信息',icon: 'none'})
				},
				complete: function(data) {
					uni.hideLoading()
				}
			});
			//#endif
			//#ifdef H5
				uni.showToast({title: '请手动选择位置信息',icon: 'none'})
			//#endif
		},
		methods: {
			saveAddress() {
				uni.setStorageSync('cityInfo',this.cityInfo)//本地保存一下城市编码
				uni.showLoading()
				this.$myRequest({
					method: "GET",
					url: "/user/appUser/updateArea?cityCode=" + this.cityInfo.cityCode,
				}).then((res) => {
					if (res.success == 1) {
						uni.hideLoading()
						uni.showToast({
							title: '地址保存成功',
							icon: 'none'
						})
						let userInfo = uni.getStorageSync('userInfo')
						userInfo.cityCode = this.cityInfo.cityCode
						uni.setStorageSync('userInfo',userInfo)
						let timer = setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}.bind(this), 2000)
					}
				}).catch((err) =>
					uni.hideLoading()
				)
			},
			openModel() {
				if (!this.cityInfo.cityCode) {
					uni.showToast({
						title: '请完善位置信息',
						icon: 'none'
					})
				} else {
					this.showModel = true
				}
			},
			/** 弹框选择地址
			 *  @param {*} e 省市区数据
			 * */
			confirmAddress(e) {
				this.cityInfo.cityCode = e.area.value
				this.cityInfo.addressName = e.province.label + '/' + e.city.label + '/' + e.area.label
			},
			getCityList(param){
				this.$myRequest({
					method: "GET",
					url: "/system/city/list",
				}).then((res) => {
					if (res.success == 1) {
						let cityList = res.data
						cityList.forEach((item,index) => {
							if(item.name == param.district){
								this.cityInfo.cityCode = item.code
								this.cityInfo.addressName = param.province + '/' + param.city + '/' + param.district
							}
						})
					}else{
						uni.hideLoading()
						uni.showToast({title: res.msg,icon: 'none'})
					}
				}).catch((err) => {
					uni.showToast({title: '获取位置失败，请手动选择',icon: 'none'})
				})
			},
			// 退出登录
			async loginOut() {
				// 改为try_catch
				try{
					getApp().globalData.customerData = null
				    uni.clearStorageSync();
					uni.getSystemInfo({
					    success: function (res) {
					       let appType = res.platform
						   if(appType=='android'){
							   // console.log('安卓');
						   }else{
							  uni.setStorageSync("argeeState", 1);
						   }
					    }.bind(this)
					});
				}catch(e){
					uni.showToast({
						title: '退出失败',
						icon: 'error'
					})
					return false
				}
				const res = await this.$myRequest({
					url:'/user/appUser/logout',
				})
				if(res.success !==1 ) return uni.showToast({
					title:res.msg,
					icon:'none'
				})
				uni.reLaunch({
					url: '/pages/login/login'
				})
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
		.phone_number {
			border-bottom: 2rpx solid #ebebeb;
			.label {
				font-size: 34rpx;
				text-align: left;
				color: #333333;
			}
			.number {
				width: 650rpx;
				font-size: 42rpx;
				margin: 30rpx 0 33rpx 0;
				color: #333333;
				font-weight: 700;
			}
			.content {
				display: flex;
				align-items: center;
				justify-content: space-between;

				image {
					width: 43rpx;
					height: 43rpx;
					position: relative;
					top: 16rpx;
				}
			}
		}
		.login_opreate {
			.login_btn {
				width: 640rpx;
				height: 100rpx;
				background: #ff7247;
				border-radius: 50rpx;
				margin-top: 83rpx;
				color: #ffffff;
				font-size: 34rpx;
				font-weight: 600;
				line-height: 100rpx;
				box-shadow: 0rpx 15rpx 10rpx 0rpx rgba(255,133,97,0.24);
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

				.option_icon1 {
					background-color: #FF7247;
					border: none;
				}
			}
		}
	}
	.footer {
		font-size: 34rpx;
		color: #ff7247;
		position: absolute;
		left: 50%;
		bottom: 81rpx;
		transform: translateX(-50%);
	}
</style>
