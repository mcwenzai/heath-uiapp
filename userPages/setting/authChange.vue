<template>
	<view class="container">
		<view class="main">
			<view class="header">
				为给您提供更优质的服务，我们需要向你申请以下
				<view>权限：</view>
			</view>
			<view class="center">
				<view
					class="list"
					v-for="(item, index) in menusList"
					:key="index"
				>
					<view class="list_left">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="sub_text" style="color: #666666">
							{{ item.subText }}
						</view>
					</view>
					<view class="list_right">
						<u-switch
							style="border: none"
							size="36"
							inactive-color="#C1C1C1"
							@change="stateChange(item)"
							active-color="#ff683a"
							v-model="item.checked"
						></u-switch>
					</view>
				</view>
			</view>
			<view class="footer">
				您可以在系统设置中关闭以上权限，关闭后可能会影
				响到部分功能的正常使用。
			</view>
		</view>
	</view>
</template>

<script>
import permision from "@/js_sdk/wa-permission/permission.js";
export default {
	data() {
		return {
			isIos: true,
			current: 0,
			menusList: [
				{
					title: "通知",
					subText: "用于资质认证、商品授权申请",
					checked: false,
					id: 0,
				},
				{
					title: "照片",
					subText: "用于资质认证、修改头像",
					checked: false,
					id: 1,
				},
				{
					title: "定位",
					subText: "可基于您当前的位置，提供商品推荐",
					checked: false,
					id: 2,
				},
			],
		};
	},
	onLoad() {
		// #ifdef APP-PLUS
		this.isIos = plus.os.name == "iOS";
		this.requestAndroidPermission(
			"android.permission.READ_EXTERNAL_STORAGE"
		);
		this.requestAndroidPermission(
			"android.permission.ACCESS_FINE_LOCATION"
		);
		uni.$on("authChange", (data) => {
			if (data.name == "android.permission.ACCESS_FINE_LOCATION") {
				this.menusList[2].checked = true;
			} else if (
				data.name == "android.permission.READ_EXTERNAL_STORAGE"
			) {
				this.menusList[1].checked = true;
			}
		});
		// #endif
	},
	onShow() {
		this.infoAuth();
		if (this.isIos) {
			this.judgeIosPermission("photoLibrary");
			this.judgeIosPermission("location");
			this.judgeIosPermission("push");
		}
	},
	methods: {
		// 通知权限管理
		infoAuth() {
			// 判断客户是否开启通知，如果没开启，则跳转到设置页面，start
			if (!this.isIos) {
				var main = plus.android.runtimeMainActivity();
				var pkName = main.getPackageName();
				var NotificationManagerCompat = plus.android.importClass(
					"android.support.v4.app.NotificationManagerCompat"
				);
				var packageNames = NotificationManagerCompat.from(main);
				if (packageNames.areNotificationsEnabled()) {
					this.menusList[0].checked = true;
				} else {
					this.menusList[0].checked = false;
				}
			} else {
				var UIApplication = plus.ios.import("UIApplication");
				var app = UIApplication.sharedApplication();
				var enabledTypes = 0;
				if (app.currentUserNotificationSettings) {
					var settings = app.currentUserNotificationSettings();
					enabledTypes = settings.plusGetAttribute("types");
					this.menusList[0].checked = true;
				} else {
					//针对低版本ios系统
					enabledTypes = app.enabledRemoteNotificationTypes();
				}
			}
		},
		stateChange(param) {
			if (param.id == 0) {
				if (!this.isIos) {
					if (!param.checked) {
						this.menusList[0].checked = true;
					} else {
						this.menusList[0].checked = false;
					}
					var main = plus.android.runtimeMainActivity();
					var pkName = main.getPackageName();
					uni.showModal({
						title: "提示",
						content: "请先打开APP通知权限",
						showCancel: false,
						success: function (res) {
							if (res.confirm) {
								var Intent = plus.android.importClass(
									"android.content.Intent"
								);
								var intent = new Intent(
									"android.settings.APP_NOTIFICATION_SETTINGS"
								); //可设置表中所有Action字段
								intent.putExtra(
									"android.provider.extra.APP_PACKAGE",
									pkName
								);
								main.startActivity(intent);
							}
						},
					});
				} else {
					if (!param.checked) {
						this.menusList[0].checked = true;
					} else {
						this.menusList[0].checked = false;
					}
					this.gotoAppPermissionSetting();
				}
			} else if (param.id == 1) {
				if (!this.isIos) {
					if (param.checked) {
						this.menusList[1].checked = false;
						this.requestAndroidPermission2(
							"android.permission.READ_EXTERNAL_STORAGE"
						);
					} else {
						this.menusList[1].checked = true;
						this.gotoAppPermissionSetting();
					}
				} else {
					if (param.checked) {
						this.menusList[1].checked = false;
					} else {
						this.menusList[1].checked = true;
					}
					this.gotoAppPermissionSetting();
				}
			} else if (param.id == 2) {
				if (!this.isIos) {
					if (param.checked) {
						this.menusList[2].checked = false;
						this.requestAndroidPermission2(
							"android.permission.ACCESS_FINE_LOCATION"
						);
					} else {
						this.menusList[2].checked = true;
						this.gotoAppPermissionSetting();
					}
				} else {
					if (param.checked) {
						this.menusList[2].checked = false;
					} else {
						this.menusList[2].checked = true;
					}
					this.gotoAppPermissionSetting();
				}
			}
		},
		onClickItem(index) {
			if (this.current !== index) {
				this.current = index;
			}
		},
		judgeIosPermission: function (permisionID) {
			var result = permision.judgeIosPermission(permisionID);
			var strStatus = result ? "已" : "未";
			if (permisionID == "photoLibrary") {
				this.menusList[1].checked = result;
			} else if (permisionID == "location") {
				this.menusList[2].checked = result;
			} else if (permisionID == "push") {
				this.menusList[0].checked = result;
			}
		},
		async requestAndroidPermission(permisionID) {
			var result = await permision.requestAndroidPermission(permisionID);
			var strStatus;
			if (result == 1) {
				strStatus = "已获得授权";
			} else if (result == 0) {
				strStatus = "未获得授权";
			} else {
				strStatus = "被永久拒绝权限";
			}
			if (permisionID == "android.permission.READ_EXTERNAL_STORAGE") {
				if (result == 1) {
					this.menusList[1].checked = true;
				} else {
					this.menusList[1].checked = false;
				}
			} else if (
				permisionID == "android.permission.ACCESS_FINE_LOCATION"
			) {
				if (result == 1) {
					this.menusList[2].checked = true;
				} else {
					this.menusList[2].checked = false;
				}
			}
		},
		async requestAndroidPermission2(permisionID) {
			var result = await permision.requestAndroidPermission(permisionID);
			var strStatus;
			if (result == 1) {
				strStatus = "已获得授权";
			} else if (result == 0) {
				strStatus = "未获得授权";
			} else {
				strStatus = "被永久拒绝权限";
				uni.showModal({
					content: "该权限已被永久拒绝，请到系统设置中进行操作",
					success: function (res) {
						if (res.confirm) {
							permision.gotoAppPermissionSetting();
						} else if (res.cancel) {
							// console.log("用户点击取消");
						}
					},
				});
			}
		},
		gotoAppPermissionSetting() {
			uni.showModal({
				content: "请到系统设置中操作该权限",
				success: function (res) {
					if (res.confirm) {
						permision.gotoAppPermissionSetting();
					} else if (res.cancel) {
						// console.log("用户点击取消");
					}
				},
			});
		},
	},
};
</script>

<style lang="scss">
page {
	background-color: #f7f6f6;
}
.main {
	width: 690rpx;
	margin: 0 auto;
	.header {
		margin-top: 51rpx;
		font-size: 30rpx;
		color: #666666;
	}
	.center {
		margin-top: 47rpx;
		.list {
			width: 690rpx;
			height: 147rpx;
			background: #ffffff;
			border-radius: 10rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			margin-bottom: 20rpx;
			.list_left {
				height: 110rpx;
				.title {
					font-size: 34rpx;
					font-weight: 700;
					color: #333333;
					margin-bottom: 21rpx;
				}
			}
			.list_right {
				width: 74rpx;
				height: 74rpx;
			}
		}
	}
	.footer {
		width: 688rpx;
		height: 74rpx;
		font-size: 30rpx;
		text-align: left;
		color: #666666;
		line-height: 45rpx;
		position: absolute;
		bottom: 120rpx;
	}
}
</style>
