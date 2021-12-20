<template>
	<view class="container">
		<view class="main">
			<view
				class="list_main"
				v-for="(item, index) in menusList"
				:key="index"
				@click="goSetDetail(item)"
				:class="{ noBorder: index == 3 }"
			>
				<view class="title">
					{{ item.title }}
				</view>
				<view
					class="arrow_left"
					v-if="item.type == 0 || item.type == 1"
				></view>
				<view class="main_left" v-if="item.type == 2 || item.type == 3">
					<view class="icon" v-if="showTag && item.type == 3">
						发现新版本
					</view>
					<view class="text">
						{{ item.text }}
					</view>
				</view>
			</view>
		</view>
		<view class="footer" @click="isShowQuitTip = true">
			<view>退出</view>
			<view class="version">
				Copyright©诊禾zhenheyiliao.com 版权所有
			</view>
		</view>
		<my-show-modal
			:content="'是否确定退出'"
			@cancel="isShowQuitTip = false"
			@confirm="loginOut"
			:show="isShowQuitTip"
		></my-show-modal>
		<u-modal
			:show-title="false"
			@confirm="clearCache()"
			@cancel="isClearCache = false"
			:cancel-style="cancelStyle"
			negative-top="160"
			v-model="isClearCache"
			:confirm-style="confirmStyle"
			:content-style="contentStyle"
			:title-style="titleStyle"
			:mask-close-able="true"
			:show-cancel-button="true"
			confirm-color="#FF7247"
			cancel-color="#999999"
			content="是否清除缓存"
		></u-modal>
		<!-- 更新提醒模态框 -->
		<my-show-modal
			title=""
			:content="versionContent"
			cancelTxt="暂不更新"
			confirmTxt="马上升级"
			:confirm-style="confirmStyle"
			:content-style="contentStyle"
			@cancel="isShowUpdate = false"
			@confirm="handleUpdate"
			:show="isShowUpdate"
		></my-show-modal>
		<view class="content">
			<!-- 版本更新组件 force 是否强制更新    tabbar：页面是否有原生tabbar组件-->
			<app-update
				ref="app_update"
				:force="true"
				:tabbar="false"
			></app-update>
		</view>
	</view>
</template>

<script>
import appUpdate from "@/components/version-update/app-update"; //app更新组件
export default {
	components: {
		appUpdate,
	},
	data() {
		return {
			menusList: [
				{
					title: "隐私",
					type: 0,
				},
				{
					title: "关于我们",
					type: 1,
				},
				{
					title: "清除缓存",
					type: 2,
					text: "5.6M",
				},
				{
					title: "当前版本",
					type: 3,
					text: "",
				},
			],
			titleStyle: {
				fontWeight: 600,
				fontSize: "40rpx",
			},
			contentStyle: {
				fontSize: "32rpx",
				marginTop: "20rpx",
				marginBottom: "40rpx",
			},
			confirmStyle: {
				borderLeft: "2rpx solid #DCDCDC",
				fontWeight: 600,
				fontSize: "34rpx",
			},
			cancelStyle: {
				borderLeft: "2rpx solid #DCDCDC",
				fontWeight: 600,
				fontSize: "34rpx",
			},
			versionShow: false,
			isShowQuitTip: false,
			isClearCache: false,
			isShowUpdate: false,
			platform: 0,
			showTag: false,
			versionInfo: {},
			preVerInfo: {},
			versionContent: "",
		};
	},
	onLoad() {
		uni.getSystemInfo({
			success: function (res) {
				let appType = res.platform;
				if (appType == "android") {
					this.platform = 0;
				} else {
					this.platform = 1;
				}
			}.bind(this),
		});
		this.appInfo();
		this.getVersionInfo();
	},
	onHide() {
		// #ifdef APP-PLUS
		plus.nativeUI.closeWaiting();
		// #endif
	},
	mounted() {
		this.$refs.app_update.update(); //调用子组件检查更新方法
	},
	methods: {
		goSetDetail(param) {
			let that = this;
			if (param.type == 0) {
				uni.navigateTo({
					url: "/userPages/setting/privacy",
				});
			} else if (param.type == 1) {
				uni.navigateTo({
					url: "/pages/login/userAgreement?type=0",
				});
			} else if (param.type == 2) {
				this.isClearCache = true;
			} else if (param.type == 3) {
				if (
					this.versionInfo.versionCode > this.preVerInfo.versionCode
				) {
					this.isShowUpdate = true;
				}
			}
		},
		clearCache() {
			let that = this;
			// #ifdef APP-PLUS
			//使用plus.cache.clear 清除应用中的缓存数据
			plus.cache.clear(function () {
				uni.showToast({
					title: "清除成功!",
					icon: "none",
					success() {
						that.menusList[2].text = "0B";
					},
				});
			});
			// #endif
			// #ifdef APP-PLUS
			//使用plus.cache.clear 清除应用中的缓存数据
			plus.cache.clear(function () {
				uni.showToast({
					title: "清除成功!",
					icon: "none",
					success() {
						that.menusList[2].text = "0B";
					},
				});
			});
			// #endif
		},
		// 退出登录
		async loginOut() {
			const res = await this.$myRequest({
				url: "/user/appUser/logout",
			});
			if (res.success !== 1)
				return uni.showToast({
					title: res.msg,
				});
			getApp().globalData.customerData = null;
			let syncSkipData = uni.getStorageSync("syncSkipData");
			uni.clearStorageSync();
			syncSkipData && uni.setStorageSync("syncSkipData", syncSkipData);
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
		},
		appInfo() {
			// #ifdef APP-PLUS
			var that = this;
			plus.cache.calculate(function (size) {
				//size是多少个字节单位是b
				//获取缓存大小
				if (size < 1024) {
					that.menusList[2].text = size + "B";
				} else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
					that.menusList[2].text =
						Math.floor((size / 1024) * 100) / 100 + "KB";
				} else if (size / 1024 / 1024 >= 1) {
					that.menusList[2].text =
						Math.floor((size / 1024 / 1024) * 100) / 100 + "M";
				}
			});
			//应用版本号
			plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
				this.preVerInfo = wgtinfo;
				// console.log("版本信息", this.preVerInfo);
				that.menusList[3].text = "V" + this.preVerInfo.version;
			});
			// #endif
		},
		getVersionInfo() {
			const url = "/user/appVersion/getVersion?type=" + this.platform;
			this.$myRequest({
				method: "GET",
				url: url,
			}).then((res) => {
				this.versionInfo = res.data;
				this.versionContent = `当前版本为${this.menusList[3].text}，是否更新至V${this.versionInfo.versionName}？`;
				if (
					this.versionInfo.versionCode > this.preVerInfo.versionCode
				) {
					this.showTag = true;
				}
			});
		},
		handleUpdate() {
			this.isShowUpdate = false;
			this.$refs.app_update.nowUpdate();
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #f7f6f6;
	overflow-y: hidden;
}
.main {
	width: 690rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
}

.list_main {
	width: 630rpx;
	height: 110rpx;
	display: flex;
	align-items: center;
	margin: 0 auto;
	justify-content: space-between;
	border-bottom: 2rpx solid #ebebeb;
	.title {
		font-size: 32rpx;
		color: #666666;
	}
	.arrow_left {
		width: 35rpx;
		height: 35rpx;
		background: url(/static/images/arrow_left.png) no-repeat;
		background-size: 100% 100%;
	}
}
.footer {
	font-size: 32rpx;
	color: #666666;
	position: absolute;
	bottom: 81rpx;
	left: 50%;
	text-align: center;
	transform: translateX(-50%);
	.version {
		width: 502rpx;
		height: 26rpx;
		font-size: 24rpx;
		text-align: center;
		color: #999999;
		margin-top: 134rpx;
		line-height: 36rpx;
	}
}
.noBorder {
	border: none;
}
.main_left {
	font-size: 32rpx;
	color: #333333;
	display: flex;
	.icon {
		width: 134rpx;
		height: 44rpx;
		border: 2rpx solid #ff7247;
		border-radius: 10rpx;
		color: #ff7247;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		margin-right: 10rpx;
	}
}
.progress-wrap {
	position: relative;
	width: 600rpx;
	padding: 50rpx 75rpx;
	color: #333333;
	font-size: 34rpx;
	border-radius: 20rpx;
	background: #fff;
	box-shadow: -15rpx 0rpx 0rpx 0 rgba(160, 160, 160, 0.24);
	.close-wrap {
		position: absolute;
		right: 0;
		top: 0;
		padding: 10rpx 30rpx;
	}
	.close-icon {
		width: 17rpx;
		height: 17rpx;
	}
	.confirm-btn {
		margin-top: 70rpx;
		width: 450rpx;
		height: 100rpx;
		background: #ff7247;
		border-radius: 50rpx;
		font-weight: bold;
		color: #fff;
		box-shadow: 0rpx 0rpx 10rpx 5rpx rgba(255, 133, 97, 0.24);
	}
}
</style>
