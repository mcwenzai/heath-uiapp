<template>
	<view class="container">
		<view class="header">
			<view>
				您好，系统检测到您已在本公司（湖南诊禾医院管理有限责任公司）的“采药么”小程序成功通过资质认证。
			</view>
			<view style="padding: 80rpx 0">
				机构名称：湖南诊禾医院管理有限责任公司
			</view>
			<view>
				现可以帮您将资质信息同步至“禾大夫”，同步后您可以
				<text style="color: #ff7247">直接将资质提交审核。</text
				><br />请问您是否继续？
			</view>
		</view>
		<view class="footer">
			<view class="syncInfo" hover-class="hoverClass" @click="syncHandle">
				一键同步资质
			</view>
			<view
				class="skipHint"
				hover-class="hoverClass"
				@click="skipHandle(0)"
			>
				跳过，下次登录再提示
			</view>
			<view
				class="skipNoHint"
				hover-class="hoverClass"
				@click="skipHandle(1)"
			>
				跳过，不再提示
			</view>
		</view>
	</view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
	data() {
		return {
			syncSkipData: [], //跳过同步数据
			userInfo: {},
		};
	},
	onLoad() {
		uni.hideKeyboard();
		if (uni.getStorageSync("syncSkipData")) {
			this.syncSkipData = uni.getStorageSync("syncSkipData");
		}
		this.userInfo = uni.getStorageSync("userInfo");
	},
	onBackPress() {
		uni.clearStorageSync();
		uni.getSystemInfo({
			success: function (res) {
				let appType = res.platform;
				if (appType == "android") {
					//    console.log('安卓');
				} else {
					uni.setStorageSync("argeeState", 1);
				}
			}.bind(this),
		});
		uni.reLaunch({
			url: "/pages/login/login",
		});
		return true;
	},
	methods: {
		...mapMutations({
			setCertificationInfo: "certification/setInfo",
		}),
		syncHandle() {
			const url = "/user/appQualification/syncCymQualification";
			this.$myRequest({
				method: "GET",
				url: url,
			}).then((res) => {
				if (res.success === 1) {
					uni.showToast({
						title: "同步成功",
					});
					let qualification = res.data.newQualification || {};
					if (!qualification.address) {
						qualification.checkStatus = null;
					}
					this.setCertificationInfo(qualification);
					this.getAddress(qualification);
					let timer3 = setTimeout(
						function () {
							uni.reLaunch({
								url: "/userPages/certification/index",
							});
						}.bind(this),
						2000
					);
				} else {
					uni.showToast({
						title: res.msg,
					});
				}
			});
		},
		/**
		 * 判断用户操作跳转页面
		 * @param {object} 同步资质信息
		 */
		skipHandle(param) {
			if (param === 1) {
				this.syncSkipData.push(this.userInfo.phone);
				uni.setStorageSync("syncSkipData", this.syncSkipData);
			}
			if (this.userInfo.cityCode) {
				uni.switchTab({ url: "/pages/index/index" });
			} else {
				uni.reLaunch({ url: "/pages/address/index" });
			}
		},
		/**
		 * 查询省市区
		 * @param {object} 同步资质信息
		 */
		getAddress(params) {
			this.$myRequest({
				method: "GET",
				url: "/system/city/list",
			})
				.then((res) => {
					if (res.success == 1) {
						let cityList = res.data;
						uni.setStorageSync("cityList", cityList);
						let county = params.cityCode; //本地保存区域编码信息
						let city = county.slice(0, 4) + "00"; //获取市级编码
						let province = county.slice(0, 2) + "0000"; //获取省级编码
						cityList.forEach((item, index) => {
							if (item.code == province) {
								province = item.name;
							}
							if (item.code == city) {
								city = item.name;
							}
							if (item.code == county) {
								county = item.name;
							}
						});
						if (
							city == "110100" ||
							city == "500100" ||
							city == "120100" ||
							city == "310100"
						) {
							city = "直辖市";
						}
						let cityInfo = {};
						cityInfo.addressName = `${province}/${city}/${county}`;
						uni.setStorageSync("cityInfo", cityInfo); //本地保存当前区域信息
					}
				})
				.catch((err) => {});
		},
	},
};
</script>

<style lang="scss" scoped>
.header {
	width: 640rpx;
	font-size: 32rpx;
	line-height: 55rpx;
	margin: 110rpx auto;
}
.footer {
	width: 640rpx;
	margin: 0 auto;
	color: #ff7247;
	view {
		width: 640rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin-bottom: 30rpx;
		border: 2rpx solid #ff7247;
	}
}
.hoverClass {
	color: #ffffff;
	background-color: #ff7247;
}
</style>
